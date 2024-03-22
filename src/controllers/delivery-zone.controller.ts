import { Request, Response } from "express";
import DeliveryZone, { IDeliveryZone } from "../models/delivery-zone.model";

export default class DeliveryZoneController {
  async create(req: Request, res: Response) {
    const zonesData: IDeliveryZone[] = req.body;
    try {
      if (zonesData.length === 0) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const createdZones: IDeliveryZone[] = [];
      for (const zoneData of zonesData) {
        const zone: IDeliveryZone = await DeliveryZone.create(zoneData);
        createdZones.push(zone);
      }
      res.send(createdZones);
    } catch (error) {
      res.status(500).send({
        message:
          error.message ||
          "Some error occurred while creating the DeliveryZone.",
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const zones: IDeliveryZone[] = await DeliveryZone.find();
      res.send(zones);
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving DeliveryZone.",
      });
    }
  }

  // async findOne(req: Request, res: Response) {
  //   const id = req.params.id;

  //   try {
  //     const restaurant = await Restaurant.findById(id);

  //     if (!restaurant)
  //       res.status(404).send({ message: "Not found Restaurant with id " + id });
  //     else res.send(restaurant);
  //   } catch (error) {
  //     res.status(500).send({
  //       message: error.message || "Error retrieving Restaurant with id=" + id,
  //     });
  //   }
  // }

  async update(req: Request, res: Response) {
    const zonesData: IDeliveryZone[] = req.body;
    try {
      if (zonesData.length === 0) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
      }

      const editedZones: IDeliveryZone[] = [];
      for (const zoneData of zonesData) {
        const zone: IDeliveryZone = await DeliveryZone.findByIdAndUpdate(
          zoneData.id,
          zoneData,
          {
            useFindAndModify: false,
          }
        );
        editedZones.push(zone);
        res.send(editedZones);
      }
    } catch (error) {
      res.status(500).send({
        message: error.message || "Error updating DeliveryZone",
      });
    }
  }

  // async delete(req: Request, res: Response) {
  //   const id = req.params.id;

  //   try {
  //     const restaurant = await Restaurant.findByIdAndDelete(id, {
  //       useFindAndModify: false,
  //     });

  //     if (!restaurant) {
  //       res.status(404).send({
  //         message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`,
  //       });
  //     } else {
  //       res.send({
  //         message: "Restaurant was deleted successfully!",
  //       });
  //     }
  //   } catch (error) {
  //     res.status(500).send({
  //       message: error.message || "Could not delete Restaurant with id=" + id,
  //     });
  //   }
  // }

  async deleteAll(req: Request, res: Response) {
    try {
      const zones = await DeliveryZone.deleteMany({});
      res.send({
        message: `${zones.deletedCount} DeliveryZone were deleted successfully!`,
      });
    } catch (error) {
      res.status(500).send({
        message:
          error.message || "Some error occurred while removing all tutorials.",
      });
    }
  }
}
