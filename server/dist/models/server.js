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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const historias_1 = __importDefault(require("../routes/historias"));
const user_1 = __importDefault(require("../routes/user"));
const cita_1 = __importDefault(require("../routes/cita"));
const paciente_1 = require("./paciente");
const examen_1 = __importDefault(require("../routes/examen"));
const path_1 = __importDefault(require("path"));
const funcionario_1 = require("./funcionario");
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/', (req, res) => {
            res.json({
                msg: 'API FUNCIONANDO'
            });
        });
        this.app.use('/api/historias', historias_1.default);
        this.app.use('/api/users', user_1.default);
        this.app.use('/api/examenes', examen_1.default);
        this.app.use('/api/citas', cita_1.default);
    }
    middlewares() {
        //parseo
        this.app.use(express_1.default.json());
        //cors
        this.app.use((0, cors_1.default)());
        //Directorio público para archivos subidos
        this.app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../public/uploads')));
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield paciente_1.Paciente.sync();
                yield funcionario_1.Funcionario.sync();
            }
            catch (error) {
                console.log(error);
                console.log('Error al conectarse a la base de datos');
            }
        });
    }
}
exports.default = Server;
