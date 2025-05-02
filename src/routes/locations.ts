import { Request, Response } from "express";
import { Location } from "../models/location";
import Route from "../services/route";
import ErrorHandler from "../services/error_handler";
import auth from "../middleware/auth";
import { PipelineStage, Types } from "mongoose";

export default class Locations extends Route {
  constructor() {
    super();

    this.router.get("/:id", [auth], this.getLocationById);
    this.router.get("/", [auth], this.getAllMyLocations);
    this.router.post("/", [auth], this.createNewLocation);
    this.router.delete("/:id", [auth], this.deleteLocation);
  }

  private async getAllMyLocations(req: Request, res: Response) {
    let query: object = { owner: req.user!._id };

    if (req.query.parent) {
      query = {
        ...query,
        parent: req.query.parent === "none" ? null : req.query.parent,
      };
    }

    try {
      const locations = await Location.find(query);
      res.send(locations);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }

  private async getLocationById(req: Request, res: Response) {
    // Get query params for optional fields
    const includePath = req.query.path === "true";

    // Setup the pipeline for the base object
    const pipeline: PipelineStage[] = [
      {
        $match: {
          _id: new Types.ObjectId(req.params.id),
          owner: new Types.ObjectId(req.user!._id),
        },
      },
    ];

    // If requested, find the path to the current location
    if (includePath) {
      pipeline.push({
        $graphLookup: {
          from: "locations",
          startWith: "$parent",
          connectFromField: "parent",
          connectToField: "_id",
          as: "path",
        },
      });
    }

    try {
      // Run the final pipeline
      const lookupResult = await Location.aggregate(pipeline);

      // Check if anything was found at all
      if (lookupResult.length === 0) res.sendStatus(404);

      // Return the final object
      res.send(lookupResult[0]);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }

  private async createNewLocation(req: Request, res: Response) {
    try {
      // Create the location from the request body
      const location = new Location(req.body);

      // If a parent is present, check if it exists and belongs to the user
      if (location.parent) {
        const parent = await Location.findOne({
          owner: req.user!._id,
          _id: location.parent,
        });
        if (!parent) {
          res.status(400).send("Parent does not exist");
          return;
        }
      }

      // Attach the owner
      location.owner = req.user!._id;

      // Save the new location
      await location.save();
      res.send(location);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }

  private async deleteLocation(req: Request, res: Response) {
    try {
      // Find the target locations
      const deleteTarget = await Location.findOne({
        _id: req.params.id,
        owner: req.user!._id,
      });

      // Check if the target exists
      if (!deleteTarget) {
        res.sendStatus(404);
        return;
      }

      // Check if it has any children
      const children = await Location.find({
        owner: req.user!._id,
        parent: deleteTarget!._id,
      });

      if (children.length > 0) {
        res.status(400).send("Cannot delete a location with children.");
        return;
      }

      // Delete the target location
      await deleteTarget.deleteOne();
      res.sendStatus(204);
    } catch (e: any) {
      ErrorHandler.handleRouteError(e, res);
      return;
    }
  }
}
