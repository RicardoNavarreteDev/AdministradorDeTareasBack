"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const Task_1 = __importDefault(require("../models/Task"));
const mongoose_1 = __importDefault(require("mongoose"));
class TaskController {
    static createTask = async (req, res) => {
        try {
            const task = new Task_1.default(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);
            //almacena en la bdd la tarea
            //almacena en la bdd la tarea al proyecto
            //Usamos promise para ejecutar ambas tareas
            await Promise.allSettled([task.save(), req.project.save()]);
            res.send('Tarea creada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static getProjectTasks = async (req, res) => {
        try {
            const tasks = await Task_1.default.find({ project: req.project.id }).populate('project');
            res.json(tasks);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static getTaskById = async (req, res) => {
        try {
            const task = await Task_1.default.findById(req.task.id)
                .populate({ path: 'completedBy.user', select: 'id name email' })
                .populate({ path: 'notes', populate: { path: 'createdBy', select: 'id name email' } });
            res.json(task);
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static updateTask = async (req, res) => {
        try {
            req.task.name = req.body.name;
            req.task.description = req.body.description;
            await req.task.save();
            res.send('Tarea actualizada correctamente');
        }
        catch (error) {
            res.status(500).json({ error: 'Hubo un error' });
        }
    };
    static deleteTask = async (req, res) => {
        const session = await mongoose_1.default.startSession();
        session.startTransaction();
        try {
            // Verifica si la tarea pertenece al proyecto correcto
            if (req.task.project.toString() !== req.project.id.toString()) {
                await session.abortTransaction();
                session.endSession();
                const error = new Error("Accion no valida");
                res.status(400).json({ error: error.message });
                return;
            }
            // Eliminar la tarea del proyecto
            req.project.tasks = req.project.tasks.filter((tasks) => tasks.toString() !== req.task.id);
            await Promise.allSettled([
                req.task.deleteOne({ session }),
                req.project.save({ session })
            ]);
            await session.commitTransaction();
            session.endSession();
            res.send("Tarea Eliminada Correctamente");
        }
        catch (error) {
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({ error: "Hubo un Error" });
        }
    };
    static updateStatus = async (req, res) => {
        try {
            const { status } = req.body;
            req.task.status = status;
            const data = {
                user: req.user.id,
                status
            };
            req.task.completedBy.push(data);
            await req.task.save();
            res.send('Tarea actualizada');
        }
        catch (error) {
            res.status(500).json({ error: "Hubo un Error" });
        }
    };
}
exports.TaskController = TaskController;
//# sourceMappingURL=TaskController.js.map