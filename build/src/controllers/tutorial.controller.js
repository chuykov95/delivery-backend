"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const Tutorial = models_1.default.tutorials;
class TutorialController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validate request
            if (!req.body.title) {
                res.status(400).send({ message: "Content can not be empty!" });
                return;
            }
            // Create a Tutorial
            const tutorial = new Tutorial({
                title: req.body.title,
                description: req.body.description,
                published: req.body.published ? req.body.published : false,
            });
            // Save Tutorial in the database
            tutorial
                .save(tutorial)
                .then((data) => {
                res.send(data);
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the Tutorial.",
                });
            });
        });
    }
    findAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const title = req.query.title;
            var condition = title
                ? { title: { $regex: new RegExp(title), $options: "i" } }
                : {};
            Tutorial.find(condition)
                .then((data) => {
                res.send(data);
            })
                .catch((err) => {
                res.status(500).send({
                    message: err.message || "Some error occurred while retrieving tutorials.",
                });
            });
        });
    }
    findOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            Tutorial.findById(id)
                .then((data) => {
                if (!data)
                    res.status(404).send({ message: "Not found Tutorial with id " + id });
                else
                    res.send(data);
            })
                .catch((err) => {
                res
                    .status(500)
                    .send({ message: "Error retrieving Tutorial with id=" + id });
            });
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: "update OK",
                    reqParamId: req.params.id,
                    reqBody: req.body,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!",
                });
            }
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                res.status(200).json({
                    message: "delete OK",
                    reqParamId: req.params.id,
                });
            }
            catch (err) {
                res.status(500).json({
                    message: "Internal Server Error!",
                });
            }
        });
    }
}
exports.default = TutorialController;
