"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var agent = __importStar(require("superagent"));
var superagent_proxy_1 = __importDefault(require("superagent-proxy"));
var cryptoUtil_1 = require("../lib/cryptoUtil");
var CypherNodeGatewayUrl = (process && process.env.CYPHER_GATEWAY_URL) || "https://localhost:2009/v0/";
var CypherNodeApiKey = (process && process.env.CYPHERNODE_API_KEY) || "";
var CypherNodeApiKeyID = (process && process.env.CYPHERNODE_API_KEY_ID) || 3;
var CypherNodeCertCAPem = (process && process.env.CYPHERNODE_GATEKEEPER_CERT_CA) || "";
var makeToken = cryptoUtil_1.crypto().makeToken;
exports.default = (function (_a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.gatewayUrl, gatewayUrl = _c === void 0 ? CypherNodeGatewayUrl : _c, _d = _b.proxyUrl, proxyUrl = _d === void 0 ? process.env.CYPHERNODE_HTTP_TRANSPORT_PROXY : _d, _e = _b.auth, auth = _e === void 0 ? function () { return makeToken(CypherNodeApiKey, CypherNodeApiKeyID); } : _e, _f = _b.customHeaders, customHeaders = _f === void 0 ? function (_a) {
        var command = _a.command, payload = _a.payload;
        return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_b) {
            return [2 /*return*/, ({})];
        }); });
    } : _f;
    // Extend superagent with proxyUrl
    superagent_proxy_1.default(agent);
    var _makeHeaders = function (_a) {
        var command = _a.command, payload = _a.payload;
        return __awaiter(void 0, void 0, void 0, function () {
            var token, headers, headersObj;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, auth()];
                    case 1:
                        token = _b.sent();
                        headers = {
                            Authorization: "Bearer " + token
                        };
                        if (!(typeof customHeaders === "function")) return [3 /*break*/, 3];
                        return [4 /*yield*/, customHeaders({ command: command, payload: payload })];
                    case 2:
                        headersObj = _b.sent();
                        if (headersObj) {
                            headers = __assign(__assign({}, headers), headersObj);
                        }
                        _b.label = 3;
                    case 3: return [2 /*return*/, headers];
                }
            });
        });
    };
    var transport = {
        get: function (command, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var body, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _b = (_a = agent
                                .get("" + gatewayUrl + command + "/" + (payload ? payload : ""))
                                .proxy(proxyUrl)
                                .ca(CypherNodeCertCAPem)).set;
                            return [4 /*yield*/, _makeHeaders({ command: command, payload: payload })];
                        case 1: return [4 /*yield*/, _b.apply(_a, [_c.sent()])];
                        case 2:
                            body = (_c.sent()).body;
                            return [2 /*return*/, body];
                    }
                });
            });
        },
        post: function (command, payload) {
            return __awaiter(this, void 0, void 0, function () {
                var token, body, _a, _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0: return [4 /*yield*/, auth()];
                        case 1:
                            token = _c.sent();
                            _b = (_a = agent
                                .post("" + gatewayUrl + command)
                                .proxy(proxyUrl)
                                .ca(CypherNodeCertCAPem)).set;
                            return [4 /*yield*/, _makeHeaders({ command: command, payload: payload })];
                        case 2: return [4 /*yield*/, _b.apply(_a, [_c.sent()])
                                .send(payload)];
                        case 3:
                            body = (_c.sent()).body;
                            return [2 /*return*/, body];
                    }
                });
            });
        }
    };
    return __assign({}, transport);
});
