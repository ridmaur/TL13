(function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
        }
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: false,
            exports: {}
        };
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        module.l = true;
        return module.exports;
    }
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function(exports, name, getter) {
        if (!__webpack_require__.o(exports, name)) {
            Object.defineProperty(exports, name, {
                configurable: false,
                enumerable: true,
                get: getter
            });
        }
    };
    __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function getDefault() {
            return module["default"];
        } : function getModuleExports() {
            return module;
        };
        __webpack_require__.d(getter, "a", getter);
        return getter;
    };
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "";
    return __webpack_require__(__webpack_require__.s = 13);
})([ function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var consoleLogger = {
        type: "logger",
        log: function log(args) {
            this._output("log", args);
        },
        warn: function warn(args) {
            this._output("warn", args);
        },
        error: function error(args) {
            this._output("error", args);
        },
        _output: function _output(type, args) {
            if (console && console[type]) console[type].apply(console, Array.prototype.slice.call(args));
        }
    };
    var Logger = function() {
        function Logger(concreteLogger) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, Logger);
            this.subs = [];
            this.init(concreteLogger, options);
        }
        Logger.prototype.init = function init(concreteLogger) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            this.prefix = options.prefix || "i18next:";
            this.logger = concreteLogger || consoleLogger;
            this.options = options;
            this.debug = options.debug === false ? false : true;
        };
        Logger.prototype.setDebug = function setDebug(bool) {
            this.debug = bool;
            this.subs.forEach(function(sub) {
                sub.setDebug(bool);
            });
        };
        Logger.prototype.log = function log() {
            this.forward(arguments, "log", "", true);
        };
        Logger.prototype.warn = function warn() {
            this.forward(arguments, "warn", "", true);
        };
        Logger.prototype.error = function error() {
            this.forward(arguments, "error", "");
        };
        Logger.prototype.deprecate = function deprecate() {
            this.forward(arguments, "warn", "WARNING DEPRECATED: ", true);
        };
        Logger.prototype.forward = function forward(args, lvl, prefix, debugOnly) {
            if (debugOnly && !this.debug) return;
            if (typeof args[0] === "string") args[0] = prefix + this.prefix + " " + args[0];
            this.logger[lvl](args);
        };
        Logger.prototype.create = function create(moduleName) {
            var sub = new Logger(this.logger, _extends({
                prefix: this.prefix + ":" + moduleName + ":"
            }, this.options));
            this.subs.push(sub);
            return sub;
        };
        return Logger;
    }();
    exports.default = new Logger();
}, function(module, exports, __webpack_require__) {
    "use strict";
    class TemplateBuilder {
        constructor() {
            this.template = {};
        }
        setTitle(title) {
            this.template.title = title;
            return this;
        }
        setToken(token) {
            this.template.token = token;
            return this;
        }
        setBackgroundImage(image) {
            this.template.backgroundImage = image;
            return this;
        }
        setBackButtonBehavior(backButtonBehavior) {
            this.template.backButton = backButtonBehavior;
            return this;
        }
        build() {
            return this.template;
        }
    }
    module.exports.TemplateBuilder = TemplateBuilder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    class TextUtils {
        static makePlainText(text) {
            return {
                text: text,
                type: "PlainText"
            };
        }
        static makeRichText(text) {
            return {
                text: text,
                type: "RichText"
            };
        }
        static makeTextContent(primaryText, secondaryText, tertiaryText) {
            const textContent = {};
            if (primaryText) {
                textContent.primaryText = primaryText;
            }
            if (secondaryText) {
                textContent.secondaryText = secondaryText;
            }
            if (tertiaryText) {
                textContent.tertiaryText = tertiaryText;
            }
            return textContent;
        }
    }
    module.exports.TextUtils = TextUtils;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var EventEmitter = function() {
        function EventEmitter() {
            _classCallCheck(this, EventEmitter);
            this.observers = {};
        }
        EventEmitter.prototype.on = function on(events, listener) {
            var _this = this;
            events.split(" ").forEach(function(event) {
                _this.observers[event] = _this.observers[event] || [];
                _this.observers[event].push(listener);
            });
        };
        EventEmitter.prototype.off = function off(event, listener) {
            var _this2 = this;
            if (!this.observers[event]) {
                return;
            }
            this.observers[event].forEach(function() {
                if (!listener) {
                    delete _this2.observers[event];
                } else {
                    var index = _this2.observers[event].indexOf(listener);
                    if (index > -1) {
                        _this2.observers[event].splice(index, 1);
                    }
                }
            });
        };
        EventEmitter.prototype.emit = function emit(event) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }
            if (this.observers[event]) {
                this.observers[event].forEach(function(observer) {
                    observer.apply(undefined, args);
                });
            }
            if (this.observers["*"]) {
                this.observers["*"].forEach(function(observer) {
                    var _ref;
                    observer.apply(observer, (_ref = [ event ]).concat.apply(_ref, args));
                });
            }
        };
        return EventEmitter;
    }();
    exports.default = EventEmitter;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.makeString = makeString;
    exports.copy = copy;
    exports.setPath = setPath;
    exports.pushPath = pushPath;
    exports.getPath = getPath;
    exports.deepExtend = deepExtend;
    exports.regexEscape = regexEscape;
    exports.escape = escape;
    function makeString(object) {
        if (object == null) return "";
        return "" + object;
    }
    function copy(a, s, t) {
        a.forEach(function(m) {
            if (s[m]) t[m] = s[m];
        });
    }
    function getLastOfPath(object, path, Empty) {
        function cleanKey(key) {
            return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
        }
        var stack = typeof path !== "string" ? [].concat(path) : path.split(".");
        while (stack.length > 1) {
            if (!object) return {};
            var key = cleanKey(stack.shift());
            if (!object[key] && Empty) object[key] = new Empty();
            object = object[key];
        }
        if (!object) return {};
        return {
            obj: object,
            k: cleanKey(stack.shift())
        };
    }
    function setPath(object, path, newValue) {
        var _getLastOfPath = getLastOfPath(object, path, Object), obj = _getLastOfPath.obj, k = _getLastOfPath.k;
        obj[k] = newValue;
    }
    function pushPath(object, path, newValue, concat) {
        var _getLastOfPath2 = getLastOfPath(object, path, Object), obj = _getLastOfPath2.obj, k = _getLastOfPath2.k;
        obj[k] = obj[k] || [];
        if (concat) obj[k] = obj[k].concat(newValue);
        if (!concat) obj[k].push(newValue);
    }
    function getPath(object, path) {
        var _getLastOfPath3 = getLastOfPath(object, path), obj = _getLastOfPath3.obj, k = _getLastOfPath3.k;
        if (!obj) return undefined;
        return obj[k];
    }
    function deepExtend(target, source, overwrite) {
        for (var prop in source) {
            if (prop in target) {
                if (typeof target[prop] === "string" || target[prop] instanceof String || typeof source[prop] === "string" || source[prop] instanceof String) {
                    if (overwrite) target[prop] = source[prop];
                } else {
                    deepExtend(target[prop], source[prop], overwrite);
                }
            } else {
                target[prop] = source[prop];
            }
        }
        return target;
    }
    function regexEscape(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
    }
    var _entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
        "/": "&#x2F;"
    };
    function escape(data) {
        if (typeof data === "string") {
            return data.replace(/[&<>"'\/]/g, function(s) {
                return _entityMap[s];
            });
        } else {
            return data;
        }
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    const http = __webpack_require__(8);
    const https = __webpack_require__(7);
    const url = __webpack_require__(52);
    const HTTPS_PROTOCOL = "https:";
    class ApiClient {
        post(uri, headers, body) {
            const options = this.__buildOptions(uri, headers, "POST");
            return this.__dispatch(options, body);
        }
        put(uri, headers, body) {
            const options = this.__buildOptions(uri, headers, "PUT");
            return this.__dispatch(options, body);
        }
        get(uri, headers) {
            const options = this.__buildOptions(uri, headers, "GET");
            return this.__dispatch(options);
        }
        delete(uri, headers) {
            const options = this.__buildOptions(uri, headers, "DELETE");
            return this.__dispatch(options);
        }
        __buildOptions(uri, headers, method) {
            const urlObj = url.parse(uri);
            return {
                hostname: urlObj.hostname,
                port: urlObj.port,
                path: urlObj.path,
                protocol: urlObj.protocol,
                headers: headers,
                method: method
            };
        }
        __dispatch(options, body) {
            return new Promise((resolve, reject) => {
                const protocol = options.protocol === HTTPS_PROTOCOL ? https : http;
                const clientRequest = protocol.request(options, response => {
                    const chunks = [];
                    response.on("data", chunk => {
                        chunks.push(chunk);
                    });
                    response.on("end", () => {
                        const responseStr = chunks.join("");
                        const responseObj = {
                            statusCode: response.statusCode,
                            statusText: response.statusText,
                            body: responseStr,
                            headers: response.headers
                        };
                        resolve(responseObj);
                    });
                });
                clientRequest.on("error", err => {
                    reject(err);
                });
                if (body) {
                    clientRequest.write(body);
                }
                clientRequest.end();
            });
        }
    }
    module.exports.ApiClient = ApiClient;
}, function(module, exports, __webpack_require__) {
    "use strict";
    class ServiceError extends Error {
        constructor(statusCode, message) {
            super(message);
            this.name = "ServiceError";
            this.statusCode = statusCode;
            Error.captureStackTrace(this, ServiceError);
        }
    }
    module.exports.ServiceError = ServiceError;
}, function(module, exports) {
    module.exports = require("https");
}, function(module, exports) {
    module.exports = require("http");
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = {
        processors: {},
        addPostProcessor: function addPostProcessor(module) {
            this.processors[module.name] = module;
        },
        handle: function handle(processors, value, key, options, translator) {
            var _this = this;
            processors.forEach(function(processor) {
                if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
            });
            return value;
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.convertAPIOptions = convertAPIOptions;
    exports.convertJSONOptions = convertJSONOptions;
    exports.convertTOptions = convertTOptions;
    exports.appendBackwardsAPI = appendBackwardsAPI;
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function convertInterpolation(options) {
        options.interpolation = {
            unescapeSuffix: "HTML"
        };
        options.interpolation.prefix = options.interpolationPrefix || "__";
        options.interpolation.suffix = options.interpolationSuffix || "__";
        options.interpolation.escapeValue = options.escapeInterpolation || false;
        options.interpolation.nestingPrefix = options.reusePrefix || "$t(";
        options.interpolation.nestingSuffix = options.reuseSuffix || ")";
        return options;
    }
    function convertAPIOptions(options) {
        if (options.resStore) options.resources = options.resStore;
        if (options.ns && options.ns.defaultNs) {
            options.defaultNS = options.ns.defaultNs;
            options.ns = options.ns.namespaces;
        } else {
            options.defaultNS = options.ns || "translation";
        }
        if (options.fallbackToDefaultNS && options.defaultNS) options.fallbackNS = options.defaultNS;
        options.saveMissing = options.sendMissing;
        options.saveMissingTo = options.sendMissingTo || "current";
        options.returnNull = options.fallbackOnNull ? false : true;
        options.returnEmptyString = options.fallbackOnEmpty ? false : true;
        options.returnObjects = options.returnObjectTrees;
        options.joinArrays = "\n";
        options.returnedObjectHandler = options.objectTreeKeyHandler;
        options.parseMissingKeyHandler = options.parseMissingKey;
        options.appendNamespaceToMissingKey = true;
        options.nsSeparator = options.nsseparator;
        options.keySeparator = options.keyseparator;
        if (options.shortcutFunction === "sprintf") {
            options.overloadTranslationOptionHandler = function(args) {
                var values = [];
                for (var i = 1; i < args.length; i++) {
                    values.push(args[i]);
                }
                return {
                    postProcess: "sprintf",
                    sprintf: values
                };
            };
        }
        options.whitelist = options.lngWhitelist;
        options.preload = options.preload;
        if (options.load === "current") options.load = "currentOnly";
        if (options.load === "unspecific") options.load = "languageOnly";
        options.backend = options.backend || {};
        options.backend.loadPath = options.resGetPath || "locales/__lng__/__ns__.json";
        options.backend.addPath = options.resPostPath || "locales/add/__lng__/__ns__";
        options.backend.allowMultiLoading = options.dynamicLoad;
        options.cache = options.cache || {};
        options.cache.prefix = "res_";
        options.cache.expirationTime = 7 * 24 * 60 * 60 * 1e3;
        options.cache.enabled = options.useLocalStorage ? true : false;
        options = convertInterpolation(options);
        if (options.defaultVariables) options.interpolation.defaultVariables = options.defaultVariables;
        return options;
    }
    function convertJSONOptions(options) {
        options = convertInterpolation(options);
        options.joinArrays = "\n";
        return options;
    }
    function convertTOptions(options) {
        if (options.interpolationPrefix || options.interpolationSuffix || options.escapeInterpolation) {
            options = convertInterpolation(options);
        }
        options.nsSeparator = options.nsseparator;
        options.keySeparator = options.keyseparator;
        options.returnObjects = options.returnObjectTrees;
        return options;
    }
    function appendBackwardsAPI(i18n) {
        i18n.lng = function() {
            _logger2.default.deprecate("i18next.lng() can be replaced by i18next.language for detected language or i18next.languages for languages ordered by translation lookup.");
            return i18n.services.languageUtils.toResolveHierarchy(i18n.language)[0];
        };
        i18n.preload = function(lngs, cb) {
            _logger2.default.deprecate("i18next.preload() can be replaced with i18next.loadLanguages()");
            i18n.loadLanguages(lngs, cb);
        };
        i18n.setLng = function(lng, options, callback) {
            _logger2.default.deprecate("i18next.setLng() can be replaced with i18next.changeLanguage() or i18next.getFixedT() to get a translation function with fixed language or namespace.");
            if (typeof options === "function") {
                callback = options;
                options = {};
            }
            if (!options) options = {};
            if (options.fixLng === true) {
                if (callback) return callback(null, i18n.getFixedT(lng));
            }
            i18n.changeLanguage(lng, callback);
        };
        i18n.addPostProcessor = function(name, fc) {
            _logger2.default.deprecate("i18next.addPostProcessor() can be replaced by i18next.use({ type: 'postProcessor', name: 'name', process: fc })");
            i18n.use({
                type: "postProcessor",
                name: name,
                process: fc
            });
        };
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    let doc;
    module.exports = function(dynamoClient) {
        return {
            get: function(table, userId, callback) {
                const aws = __webpack_require__(12);
                if (!table) {
                    callback("DynamoDB Table name is not set.", null);
                }
                if (dynamoClient) {
                    doc = new aws.DynamoDB.DocumentClient({
                        service: dynamoClient
                    });
                } else if (!doc) {
                    doc = new aws.DynamoDB.DocumentClient({
                        apiVersion: "2012-08-10"
                    });
                }
                const params = {
                    Key: {
                        userId: userId
                    },
                    TableName: table,
                    ConsistentRead: true
                };
                doc.get(params, function(err, data) {
                    if (err) {
                        console.log("get error: " + JSON.stringify(err, null, 4));
                        if (err.code === "ResourceNotFoundException") {
                            newTableParams.TableName = table;
                            if (!dynamoClient) {
                                dynamoClient = new aws.DynamoDB();
                            }
                            dynamoClient.createTable(newTableParams, function(err, data) {
                                if (err) {
                                    console.log("Error creating table: " + JSON.stringify(err, null, 4));
                                }
                                console.log("Creating table " + table + ":\n" + JSON.stringify(data));
                                callback(err, {});
                            });
                        } else {
                            callback(err, null);
                        }
                    } else {
                        if (isEmptyObject(data)) {
                            callback(null, {});
                        } else {
                            callback(null, data.Item.mapAttr);
                        }
                    }
                });
            },
            set: function(table, userId, data, callback) {
                const aws = __webpack_require__(12);
                if (!table) {
                    callback("DynamoDB Table name is not set.", null);
                }
                if (dynamoClient) {
                    doc = new aws.DynamoDB.DocumentClient({
                        service: dynamoClient
                    });
                } else if (!doc) {
                    doc = new aws.DynamoDB.DocumentClient({
                        apiVersion: "2012-08-10"
                    });
                }
                const params = {
                    Item: {
                        userId: userId,
                        mapAttr: data
                    },
                    TableName: table
                };
                doc.put(params, function(err, data) {
                    if (err) {
                        console.log("Error during DynamoDB put:" + err);
                    }
                    callback(err, data);
                });
            }
        };
    };
    function isEmptyObject(obj) {
        return !Object.keys(obj).length;
    }
    const newTableParams = {
        AttributeDefinitions: [ {
            AttributeName: "userId",
            AttributeType: "S"
        } ],
        KeySchema: [ {
            AttributeName: "userId",
            KeyType: "HASH"
        } ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    };
}, function(module, exports) {
    module.exports = require("aws-sdk");
}, function(module, exports, __webpack_require__) {
    "use strict";
    var https = __webpack_require__(7);
    var http = __webpack_require__(8);
    var querystring = __webpack_require__(14);
    var request = __webpack_require__(15);
    var jwt = __webpack_require__(16);
    var _config = __webpack_require__(19);
    const Alexa = __webpack_require__(20);
    const makePlainText = Alexa.utils.TextUtils.makePlainText;
    const makeImage = Alexa.utils.ImageUtils.makeImage;
    const languageStrings = {
        "en-US": {
            translation: {
                WELCOME: "Welcome to Adobe Summit EMEA Lab TL13. How can I help you?",
                WELCOME_REPROMPT: "You can choose to ask your profile info, to do this, first ask Alexa to login to Adobe. Alternatively you can ask to send a message to a phone number.",
                EXPERIENCECLOUDID_MESSAGE: "You are successfully logged in into the Experience Cloud",
                NOEXPERIENCECLOUDID: "You are not logged in yet, please ask to login to first",
                PROFILEINFO: "It seems your name is %s",
                SMSINFO: "We will send you a message shortly. Check your phone",
                HELP_MESSAGE: "You can say tell me what you like to do, or, you can say exit... Ask me to login or ask me to get your profile?",
                HELP_REPROMPT: "Where can I help you with?",
                STOP_MESSAGE: "Goodbye!"
            }
        },
        "en-GB": {
            translation: {
                WELCOME: "Welcome to Adobe Summit EMEA Lab TL13. How can I help you?",
                WELCOME_REPROMPT: "You can choose to ask your profile info, to do this, first ask Alexa to login to Adobe. Alternatively you can ask to send a message to a phone number.",
                EXPERIENCECLOUDID_MESSAGE: "You are successfully logged in into the Experience Cloud",
                NOEXPERIENCECLOUDID: "You are not logged in yet, please ask to login to first",
                PROFILEINFO: "It seems your name is %s",
                SMSINFO: "We will send you a message shortly. Check your phone",
                HELP_MESSAGE: "You can say tell me what you like to do, or, you can say exit... Ask me to login or ask me to get your profile?",
                HELP_REPROMPT: "Where can I help you with?",
                STOP_MESSAGE: "Goodbye!"
            }
        }
    };
    const handlers = {
        LaunchRequest: function() {
            var sessionAttributes = {};
            console.log("Summit Lab TL13 initiated, now move on with the next command");
            this.attributes["speechOutput"] = this.t("WELCOME", "");
            this.attributes["repromptSpeech"] = this.t("WELCOME_REPROMPT", "");
            const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
            const template = builder.setTitle("Adobe Summit EMEA Lab TL13").setBackgroundImage(makeImage("https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF")).setTextContent(makePlainText("")).build();
            this.response.speak(this.attributes["speechOutput"]).renderTemplate(template).listen(this.attributes["repromptSpeech"]);
            this.emit(":responseReady");
        },
        MyAdobeLoginIntent: function() {
            var action = "";
            console.log("Adobe Login request initiated");
            this.attributes["speechOutput"] = this.t("EXPERIENCECLOUDID_MESSAGE", "");
            this.attributes["repromptSpeech"] = this.t("WELCOME_REPROMPT", "");
            doGetAdobeLoginBearer(action, result => {
                const logintoken = result;
                console.log("Adobe Login token: " + result);
                this.attributes["logintoken"] = result;
                const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
                const template = builder.setTitle("Your Adobe login token").setBackgroundImage(makeImage("https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF")).setTextContent(makePlainText(logintoken)).build();
                this.response.speak(this.attributes["speechOutput"]).renderTemplate(template).listen(this.attributes["repromptSpeech"]);
                this.emit(":responseReady");
            });
        },
        MyAdobeProfileInfoIntent: function() {
            var action = "";
            var cid = "1";
            cid = this.event.request.intent.slots.Customerid.value;
            console.log("Adobe Profile request initiated");
            const logintoken = this.attributes["logintoken"];
            if (logintoken) {
                doGetProfileInfo(logintoken, cid, result => {
                    this.attributes["speechOutput"] = this.t("PROFILEINFO", result.fullname);
                    this.attributes["repromptSpeech"] = this.t("WELCOME_REPROMPT", "");
                    const builder = new Alexa.templateBuilders.BodyTemplate2Builder();
                    const template = builder.setTitle("Your name:").setBackgroundImage(makeImage("https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF")).setImage(makeImage(result.image)).setTextContent(makePlainText(result.fullname)).build();
                    this.response.speak(this.attributes["speechOutput"]).renderTemplate(template).listen(this.attributes["repromptSpeech"]);
                    this.emit(":responseReady");
                });
            } else {
                this.attributes["speechOutput"] = this.t("NOEXPERIENCECLOUDID", "");
                this.attributes["repromptSpeech"] = this.t("WELCOME_REPROMPT", "");
                const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
                const template = builder.setTitle("No Adobe login yet").setBackgroundImage(makeImage("https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF")).setTextContent(makePlainText("Ask login adobe first")).build();
                this.response.speak(this.attributes["speechOutput"]).renderTemplate(template).listen(this.attributes["repromptSpeech"]);
                this.emit(":responseReady");
            }
        },
        MyAdobeSendSMSIntent: function() {
            var telephoneNumber = this.event.request.intent.slots.TelephoneNumber.value;
            console.log("Adobe Send SMS request initiated");
            doSendSMS(telephoneNumber, result => {
                this.attributes["speechOutput"] = this.t("SMSINFO", "");
                this.attributes["repromptSpeech"] = this.t("WELCOME_REPROMPT", "");
                const builder = new Alexa.templateBuilders.BodyTemplate1Builder();
                const template = builder.setTitle("Your Reward!...").setBackgroundImage(makeImage("https://public.adobecc.com/files/1E1TTCPD50OSKMY5SMQFRQ1SNHCEFF")).setTextContent(makePlainText("We will send you an SMS shortly. Check your phone!")).build();
                this.response.speak(this.attributes["speechOutput"]).renderTemplate(template).listen(this.attributes["repromptSpeech"]);
                this.emit(":responseReady");
            });
        }
    };
    var mymain = function(event) {
        return new Promise((resolve, reject) => {
            var alexa = Alexa.handler(event, {
                succeed: function(arg) {
                    resolve({
                        statusCode: 200,
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: new Buffer(JSON.stringify(arg)).toString("base64")
                    });
                },
                fail: reject
            });
            alexa.appId = "amzn1.ask.skill.580ccb67-55c2-40a8-8e0d-a80527e4bcd9";
            alexa.resources = languageStrings;
            alexa.registerHandlers(handlers);
            return alexa.execute();
        });
    };
    global.main = mymain;
    function doGetAdobeLoginBearer(token, completedCallback) {
        var clientID = _config.campaign.campaignClientID, clientSecret = _config.campaign.campaignClientSecret, orgID = _config.campaign.campaignOrgID, technicalAccount = _config.campaign.campaignTechnicalAccount, PEM = _config.campaign.campaignPEM, IMSEndpoint = _config.campaign.campaignIMSEndpoint, tenant = _config.target.targetTenant;
        var accessToken, JWTToken;
        var aud = "https://ims-na1.adobelogin.com/c/" + clientID;
        var jwtPayload = {
            exp: Math.round(87e3 + Date.now() / 1e3),
            iss: orgID,
            sub: technicalAccount,
            aud: aud
        };
        jwtPayload[IMSEndpoint] = true;
        JWTToken = jwt.encode(jwtPayload, PEM, "RS256");
        console.log("JWT Token success");
        var url = "https://ims-na1.adobelogin.com/ims/exchange/jwt/";
        var formData = {
            client_id: clientID,
            client_secret: clientSecret,
            jwt_token: JWTToken
        };
        request.post({
            url: url,
            formData: formData
        }, function optionalCallback(err, httpResponse, body) {
            if (err) {
                reject(err);
            } else {
                var result = JSON.parse(body);
                accessToken = "Bearer " + result.access_token;
                completedCallback(accessToken);
            }
        });
    }
    function doGetProfileInfo(token, cid, completedCallback) {
        console.log("doGetProfileInfo with token: " + token);
        console.log("doGetProfileInfo for id :" + cid);
        var clientID = _config.campaign.campaignClientID;
        var options = {
            method: "GET",
            url: "https://mc.adobe.io/rob-in-der-maur-141117.campaign-demo.adobe.com/campaign/profileAndServicesExt/profile/byCrmid?_parameter=" + cid,
            headers: {
                "x-api-key": clientID,
                authorization: token
            }
        };
        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            var content_response = JSON.parse(body);
            console.log("Response: " + JSON.stringify(content_response));
            var firstname = content_response.content[0].firstName;
            var lastname = content_response.content[0].lastName;
            var fullname = firstname + " " + lastname;
            var thumbnail = content_response.content[0].thumbnail;
            console.log(fullname);
            console.log(thumbnail);
            var alexaResult = {
                fullname: fullname,
                image: thumbnail
            };
            completedCallback(alexaResult);
        });
    }
    function doSendSMS(telephoneNumber, completedCallback) {
        console.log("doSendSMS for telephone number: " + telephoneNumber);
        var jsonObj = {};
        jsonObj.mobilePhone = telephoneNumber;
        var messageString = JSON.stringify(jsonObj);
        console.log("payload: " + messageString);
        var options = {
            method: "POST",
            url: "https://rob-in-der-maur-141117.campaign-demo.adobe.com/rest/mcrob-in-der-maur/EVTsummitLabUnlockAdobeIORewardSMS",
            body: messageString,
            headers: {
                Authorization: "Basic bWNQdXNoOg==",
                "Content-Type": "application/json; charset=utf-8"
            }
        };
        request(options, function(error, response, body) {
            if (error) throw new Error(error);
            var content_response = JSON.parse(body);
            console.log("Response: " + JSON.stringify(content_response));
            var status = content_response.status;
            completedCallback(status);
        });
    }
}, function(module, exports) {
    module.exports = require("querystring");
}, function(module, exports) {
    module.exports = require("request");
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(17);
}, function(module, exports, __webpack_require__) {
    var crypto = __webpack_require__(18);
    var algorithmMap = {
        HS256: "sha256",
        HS384: "sha384",
        HS512: "sha512",
        RS256: "RSA-SHA256"
    };
    var typeMap = {
        HS256: "hmac",
        HS384: "hmac",
        HS512: "hmac",
        RS256: "sign"
    };
    var jwt = module.exports;
    jwt.version = "0.5.1";
    jwt.decode = function jwt_decode(token, key, noVerify, algorithm) {
        if (!token) {
            throw new Error("No token supplied");
        }
        var segments = token.split(".");
        if (segments.length !== 3) {
            throw new Error("Not enough or too many segments");
        }
        var headerSeg = segments[0];
        var payloadSeg = segments[1];
        var signatureSeg = segments[2];
        var header = JSON.parse(base64urlDecode(headerSeg));
        var payload = JSON.parse(base64urlDecode(payloadSeg));
        if (!noVerify) {
            var signingMethod = algorithmMap[algorithm || header.alg];
            var signingType = typeMap[algorithm || header.alg];
            if (!signingMethod || !signingType) {
                throw new Error("Algorithm not supported");
            }
            var signingInput = [ headerSeg, payloadSeg ].join(".");
            if (!verify(signingInput, key, signingMethod, signingType, signatureSeg)) {
                throw new Error("Signature verification failed");
            }
            if (payload.nbf && Date.now() < payload.nbf * 1e3) {
                throw new Error("Token not yet active");
            }
            if (payload.exp && Date.now() > payload.exp * 1e3) {
                throw new Error("Token expired");
            }
        }
        return payload;
    };
    jwt.encode = function jwt_encode(payload, key, algorithm, options) {
        if (!key) {
            throw new Error("Require key");
        }
        if (!algorithm) {
            algorithm = "HS256";
        }
        var signingMethod = algorithmMap[algorithm];
        var signingType = typeMap[algorithm];
        if (!signingMethod || !signingType) {
            throw new Error("Algorithm not supported");
        }
        var header = {
            typ: "JWT",
            alg: algorithm
        };
        if (options && options.header) {
            assignProperties(header, options.header);
        }
        var segments = [];
        segments.push(base64urlEncode(JSON.stringify(header)));
        segments.push(base64urlEncode(JSON.stringify(payload)));
        segments.push(sign(segments.join("."), key, signingMethod, signingType));
        return segments.join(".");
    };
    function assignProperties(dest, source) {
        for (var attr in source) {
            if (source.hasOwnProperty(attr)) {
                dest[attr] = source[attr];
            }
        }
    }
    function verify(input, key, method, type, signature) {
        if (type === "hmac") {
            return signature === sign(input, key, method, type);
        } else if (type == "sign") {
            return crypto.createVerify(method).update(input).verify(key, base64urlUnescape(signature), "base64");
        } else {
            throw new Error("Algorithm type not recognized");
        }
    }
    function sign(input, key, method, type) {
        var base64str;
        if (type === "hmac") {
            base64str = crypto.createHmac(method, key).update(input).digest("base64");
        } else if (type == "sign") {
            base64str = crypto.createSign(method).update(input).sign(key, "base64");
        } else {
            throw new Error("Algorithm type not recognized");
        }
        return base64urlEscape(base64str);
    }
    function base64urlDecode(str) {
        return new Buffer(base64urlUnescape(str), "base64").toString();
    }
    function base64urlUnescape(str) {
        str += new Array(5 - str.length % 4).join("=");
        return str.replace(/\-/g, "+").replace(/_/g, "/");
    }
    function base64urlEncode(str) {
        return base64urlEscape(new Buffer(str).toString("base64"));
    }
    function base64urlEscape(str) {
        return str.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
    }
}, function(module, exports) {
    module.exports = require("crypto");
}, function(module, exports) {
    module.exports = {
        campaign: {
            campaignClientID: "d2c09ac767024e39ad463c6194169520",
            campaignClientSecret: "59d287ae-b51d-45ac-9892-09b6f8fc025c",
            campaignOrgID: "B5BA1225524F6CEC0A490D4D@AdobeOrg",
            campaignTechnicalAccount: "D79B36525AA4FAF00A495C6C@techacct.adobe.com",
            campaignPEM: "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAucQysZ86bbN8qm1v/BumbV5g+9DUW0g/kWXfu0TLmwye3kiY\n8xxnBa0BjMKI+ggXOas5bFv/ikwK+Yl630nlqbIcHZC0myLoeCG/cRaBOnZD2xyy\nfWGKOvHIFWdfp6XWjqrdskDRb7mpw1RNPv6aU3PBN8woJr0xhu7ZILXnqp0e+mGP\naOvwyIGZdQMa0xm3oid4dzJ0okci5kruQy41uS/62lk9rY7S3sJV96RQ6O1hDihj\nzQQ+gyIfXdop+hVfJOAoiFW0nivdDf0ytHziMT1T6iXPqiHJcziG5zNdJeYkEhFV\np8zLIR5/3oPeVP4A1emk/Z6BgySp5mp3+kPXaQIDAQABAoIBACIzjynIqRc9bnxq\nPa3q4U9NiwmRvyc3PAzm9rQhzGK1hiJit1Y7KnSPD7P8tP9jsfL6JU5f+cJakcKz\nnx2xG0mM80Q2Oio92RMVE4wcmppK399dfzc6WBrWHQJjz+arz77gkoSZDnZFdo3x\n3W71rTAkJbTCL7pCJvYyz2MIWqi8h/ZIor5ljaXr7kJS0laJOXMTUiaCcuX9wVNH\nu0aioocWfpnKoBBh7IIccLtQXSzWhF1xj6TfGREe38i/58XOf8OmsfvjnK9YG/Rw\nXjt3MuisT8JhLT6HqAXAnPfxm44HXGBdFTFD1C0MopD7qW+6IHwMm/83iS/5oX3t\nWC5EzSECgYEA9UwU+2obK86Axcv3irMIIoD2rB5ixGAgFDd6cZvoZT9JJcIFSlW1\nF6xV9dsNH72ZNeGuQMGoTCKtCTnRbLTblUCIfr9LRqJevq7/aT8u9MebtcsME0Y2\nokF2srpkE1fFzFTULYMZvrJXBTUl1FO8JrK0ARNp9PX+gTkt02ce+M0CgYEAwd8r\nanlFi32ZB/mlPgfOXleIA9pup/l+L/iVXZWfUuwGiWNS72r8+XIjVHKfPnfB9eDc\n0EpQfbkaDEMEW4173co8eKKa0WJuNdM1ko2Wm4/AwSgedDevGSlXhKSr6NpT4/yw\nKRHLgIL10w7nxMRKNPvEC6AgbVSyB8IC7mq6CQ0CgYEAneeYKjAnxY9tfebLN1IA\njpWONUZqNhfbDqiX/cJrW6HdqJy5YxzBMrgRre6RCDm5AuKAldcUS86WrTW3Bs91\n+yJLu6vQ/WtQqldku4+c3p4QMnq/DzlHujOCAZPTEFCUV/DTlWirjgKn2gZYj9JH\ncHHhRkAFGVexueXhBhF/8pECgYBLFEYYAcbw8j7lW8SmdRdyaat+8oSQAIrhwP73\nMw50antNkW140pINeCo+dfU9l9tBgUeCUoVBawGvZfS2D+C8T6mDflU+aUQNDDJf\nAv4kWFNpekPw9e+VavE9qRf6ITMDw8Pk48NPjWftyIPxK6MhSa7uYaCtNnOLlZLV\nCffpsQKBgArvxL2X5xYnQpPNMMToFG7/px2sECN6rG1P6d7+8TVm670wzl3QmL6y\nGC/s+/oJCTgTf1RhZtIw25tb2n1pEC85jf/oZgGItL5kRcWixgjMro0MwKA1ZEKE\nIWeelAAFgcA8Ddd6dI9V3IOpNpXm7Vtui/8izwrMlzVwA1aLmpwe\n-----END RSA PRIVATE KEY-----",
            campaignIMSEndpoint: "https://ims-na1.adobelogin.com/s/ent_campaign_sdk"
        },
        target: {
            targetTenant: "adobeinternalpburg",
            targetClientID: "73c2d9702f954e9197128be313e6dd63",
            targetClientSecret: "955788bd-12c4-4cd5-82fd-d7edc6bca483",
            targetOrgID: "E118E1CE5444D9E40A4C98A5@AdobeOrg",
            targetTechnicalAccount: "c099b7ae-8b89-47d2-b342-87731de3417f@techacct.adobe.com",
            targetPEM: "-----BEGIN RSA PRIVATE KEY-----\nMIIEpQIBAAKCAQEAq9cKmhgz2ICYeAUwzpnZ/X73o1p3lsew2Wj6x5PYIhpOoE2Z\n2cro6IVgCNHbbttoBWjUrL5h2GTBElTOQbYFh2Qr7WVclMXFuQ0ZjhmN1lIsSv5o\naCSqy6kqeINOMes17nz6CNNWK4XyDxCUJzDucA/jDpsZRBoeb2HyQZ+/oxvaA2xs\nvrOLPFltBusNpwvln+8CgYEApti87esDEPv4NfM9npXZTa+rYgXUO5hPMJwz\n+J5hmTktXQ1FuntqgDwtKtQti/oo8agMLU3g4WYS0yiIQgHEnmiFQ8m976IU7k+4\nnLUwftkwORrtKNxFjONPsLEwQgLFh2fozB2K0sqCarmym85IMxflpGxJv/fUAFWX\nJPfU5NMCgYEA13Q6+fVv/RC5o/Y0/KUOJBfQaR33u91OTPQJLlHm7yInw7zjTabN\nZqiV/t2X0YLAYiHi6zEqTldJVJSwZ+WZVtTeNRr2IxE6m5nla1JKj+oBlDK02idI\nyleyND+XMLrNwnIqRPJ0Vqkwguk9nFHizBTxzGCsfYMeEwp9ZEAOs1E=\n-----END RSA PRIVATE KEY-----",
            targetIMSEndpoint: "https://ims-na1.adobelogin.com/s/ent_marketing_sdk"
        }
    };
}, function(module, exports, __webpack_require__) {
    var AlexaLambdaHandler = __webpack_require__(21);
    module.exports.handler = AlexaLambdaHandler.LambdaHandler;
    module.exports.CreateStateHandler = AlexaLambdaHandler.CreateStateHandler;
    module.exports.StateString = AlexaLambdaHandler.StateString;
    module.exports.templateBuilders = {
        BodyTemplate1Builder: __webpack_require__(43).BodyTemplate1Builder,
        BodyTemplate2Builder: __webpack_require__(44).BodyTemplate2Builder,
        BodyTemplate3Builder: __webpack_require__(45).BodyTemplate3Builder,
        BodyTemplate6Builder: __webpack_require__(46).BodyTemplate6Builder,
        BodyTemplate7Builder: __webpack_require__(47).BodyTemplate7Builder,
        ListTemplate1Builder: __webpack_require__(48).ListTemplate1Builder,
        ListTemplate2Builder: __webpack_require__(49).ListTemplate2Builder,
        ListItemBuilder: __webpack_require__(50).ListItemBuilder
    };
    module.exports.services = {
        DeviceAddressService: __webpack_require__(51),
        ListManagementService: __webpack_require__(53),
        DirectiveService: __webpack_require__(54)
    };
    module.exports.directives = {
        VoicePlayerSpeakDirective: __webpack_require__(55)
    };
    module.exports.utils = {
        ImageUtils: __webpack_require__(56).ImageUtils,
        TextUtils: __webpack_require__(2).TextUtils
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    const EventEmitter = __webpack_require__(22).EventEmitter;
    const util = __webpack_require__(23);
    const i18n = __webpack_require__(24);
    const sprintf = __webpack_require__(35);
    const attributesHelper = __webpack_require__(11);
    const responseHandlers = __webpack_require__(38);
    const _StateString = "STATE";
    const ResponseBuilder = __webpack_require__(40).ResponseBuilder;
    const skillEventHandlers = __webpack_require__(41).skillEventHandlers;
    const EventParser = __webpack_require__(42).EventParser;
    function AlexaRequestEmitter() {
        EventEmitter.call(this);
    }
    util.inherits(AlexaRequestEmitter, EventEmitter);
    function alexaRequestHandler(event, context, callback) {
        if (!event.session) {
            event.session = {
                attributes: {}
            };
        } else if (!event.session.attributes) {
            event.session.attributes = {};
        }
        const handler = new AlexaRequestEmitter();
        handler.setMaxListeners(Infinity);
        Object.defineProperty(handler, "_event", {
            value: event,
            writable: false
        });
        Object.defineProperty(handler, "_context", {
            value: context,
            writable: false
        });
        Object.defineProperty(handler, "_callback", {
            value: callback,
            writable: false
        });
        Object.defineProperty(handler, "state", {
            value: null,
            writable: true,
            configurable: true
        });
        Object.defineProperty(handler, "appId", {
            value: null,
            writable: true
        });
        Object.defineProperty(handler, "response", {
            value: {},
            writable: true
        });
        Object.defineProperty(handler, "dynamoDBClient", {
            value: null,
            writable: true
        });
        Object.defineProperty(handler, "dynamoDBTableName", {
            value: null,
            writable: true
        });
        Object.defineProperty(handler, "saveBeforeResponse", {
            value: false,
            writable: true
        });
        Object.defineProperty(handler, "i18n", {
            value: i18n,
            writable: true
        });
        Object.defineProperty(handler, "locale", {
            value: undefined,
            writable: true
        });
        Object.defineProperty(handler, "resources", {
            value: undefined,
            writable: true
        });
        Object.defineProperty(handler, "registerHandlers", {
            value: function() {
                RegisterHandlers.apply(handler, arguments);
            },
            writable: false
        });
        Object.defineProperty(handler, "execute", {
            value: function() {
                HandleLambdaEvent.call(handler);
            },
            writable: false
        });
        handler.registerHandlers(responseHandlers);
        handler.registerHandlers(skillEventHandlers);
        return handler;
    }
    function HandleLambdaEvent() {
        this.locale = this._event.request.locale;
        if (this.resources) {
            this.i18n.use(sprintf).init({
                overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
                returnObjects: true,
                lng: this.locale,
                resources: this.resources
            }, err => {
                if (err) {
                    throw new Error("Error initializing i18next: " + err);
                }
                ValidateRequest.call(this);
            });
        } else {
            ValidateRequest.call(this);
        }
    }
    function ValidateRequest() {
        const event = this._event;
        const context = this._context;
        const callback = this._callback;
        const handlerAppId = this.appId;
        let requestAppId = "";
        let userId = "";
        if (event.context) {
            requestAppId = event.context.System.application.applicationId;
            userId = event.context.System.user.userId;
        } else if (event.session) {
            requestAppId = event.session.application.applicationId;
            userId = event.session.user.userId;
        }
        if (!handlerAppId) {
            console.log("Warning: Application ID is not set");
        }
        try {
            if (handlerAppId && requestAppId !== handlerAppId) {
                console.log(`The applicationIds don't match: ${requestAppId} and ${handlerAppId}`);
                const error = new Error("Invalid ApplicationId: " + handlerAppId);
                if (typeof callback === "undefined") {
                    return context.fail(error);
                } else {
                    return callback(error);
                }
            }
            if (this.dynamoDBTableName && (!event.session.sessionId || event.session["new"])) {
                attributesHelper(this.dynamoDBClient).get(this.dynamoDBTableName, userId, (err, data) => {
                    if (err) {
                        const error = new Error("Error fetching user state: " + err);
                        if (typeof callback === "undefined") {
                            return context.fail(error);
                        } else {
                            return callback(error);
                        }
                    }
                    Object.assign(this._event.session.attributes, data);
                    EmitEvent.call(this);
                });
            } else {
                EmitEvent.call(this);
            }
        } catch (e) {
            console.log(`Unexpected exception '${e}':\n${e.stack}`);
            if (typeof callback === "undefined") {
                return context.fail(e);
            } else {
                return callback(e);
            }
        }
    }
    function EmitEvent() {
        this.state = this._event.session.attributes[_StateString] || "";
        let eventString = "";
        if (this._event.session["new"] && this.listenerCount("NewSession" + this.state) === 1) {
            eventString = "NewSession";
        } else {
            eventString = EventParser.parseEventName(this._event);
        }
        const handlerFuncName = eventString;
        eventString += this.state;
        if (this.listenerCount(eventString) < 1) {
            eventString = "Unhandled" + this.state;
        }
        if (this.listenerCount(eventString) < 1) {
            throw new Error(`In state: ${this.state}. No handler function was defined for event ${handlerFuncName} ` + `and no 'Unhandled' function was defined.`);
        }
        this.emit(eventString);
    }
    function RegisterHandlers() {
        for (let arg = 0; arg < arguments.length; arg++) {
            const handlerObject = arguments[arg];
            if (!isObject(handlerObject)) {
                throw new Error(`Argument #${arg} was not an Object`);
            }
            const eventNames = Object.keys(handlerObject);
            for (let i = 0; i < eventNames.length; i++) {
                if (typeof handlerObject[eventNames[i]] !== "function") {
                    throw new Error(`Event handler for '${eventNames[i]}' was not a function`);
                }
                let eventName = eventNames[i];
                if (handlerObject[_StateString]) {
                    eventName += handlerObject[_StateString];
                }
                const localize = function() {
                    return this.i18n.t.apply(this.i18n, arguments);
                };
                const handlerContext = {
                    on: this.on.bind(this),
                    emit: this.emit.bind(this),
                    emitWithState: EmitWithState.bind(this),
                    handler: this,
                    i18n: this.i18n,
                    locale: this.locale,
                    t: localize,
                    event: this._event,
                    attributes: this._event.session.attributes,
                    context: this._context,
                    callback: this._callback,
                    name: eventName,
                    isOverridden: IsOverridden.bind(this, eventName),
                    response: new ResponseBuilder(this)
                };
                this.on(eventName, handlerObject[eventNames[i]].bind(handlerContext));
            }
        }
    }
    function isObject(obj) {
        return !!obj && obj.constructor === Object;
    }
    function IsOverridden(name) {
        return this.listenerCount(name) > 1;
    }
    function createStateHandler(state, obj) {
        if (!obj) {
            obj = {};
        }
        Object.defineProperty(obj, _StateString, {
            value: state || ""
        });
        return obj;
    }
    function EmitWithState() {
        if (arguments.length === 0) {
            throw new Error("EmitWithState called without arguments");
        }
        arguments[0] = arguments[0] + this.state;
        if (this.listenerCount(arguments[0]) < 1) {
            arguments[0] = "Unhandled" + this.state;
        }
        if (this.listenerCount(arguments[0]) < 1) {
            throw new Error(`No 'Unhandled' function defined for event: ${arguments[0]}`);
        }
        this.emit.apply(this, arguments);
    }
    process.on("uncaughtException", function(err) {
        console.log(`Uncaught exception: ${err}\n${err.stack}`);
        throw err;
    });
    module.exports.LambdaHandler = alexaRequestHandler;
    module.exports.CreateStateHandler = createStateHandler;
    module.exports.StateString = _StateString;
}, function(module, exports) {
    module.exports = require("events");
}, function(module, exports) {
    module.exports = require("util");
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(25).default;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _i18next = __webpack_require__(26);
    var _i18next2 = _interopRequireDefault(_i18next);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    exports.default = _i18next2.default;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    var _EventEmitter2 = __webpack_require__(3);
    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
    var _ResourceStore = __webpack_require__(27);
    var _ResourceStore2 = _interopRequireDefault(_ResourceStore);
    var _Translator = __webpack_require__(28);
    var _Translator2 = _interopRequireDefault(_Translator);
    var _LanguageUtils = __webpack_require__(29);
    var _LanguageUtils2 = _interopRequireDefault(_LanguageUtils);
    var _PluralResolver = __webpack_require__(30);
    var _PluralResolver2 = _interopRequireDefault(_PluralResolver);
    var _Interpolator = __webpack_require__(31);
    var _Interpolator2 = _interopRequireDefault(_Interpolator);
    var _BackendConnector = __webpack_require__(32);
    var _BackendConnector2 = _interopRequireDefault(_BackendConnector);
    var _CacheConnector = __webpack_require__(33);
    var _CacheConnector2 = _interopRequireDefault(_CacheConnector);
    var _defaults2 = __webpack_require__(34);
    var _postProcessor = __webpack_require__(9);
    var _postProcessor2 = _interopRequireDefault(_postProcessor);
    var _v = __webpack_require__(10);
    var compat = _interopRequireWildcard(_v);
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }
    var I18n = function(_EventEmitter) {
        _inherits(I18n, _EventEmitter);
        function I18n() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];
            _classCallCheck(this, I18n);
            var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
            _this.options = (0, _defaults2.transformOptions)(options);
            _this.services = {};
            _this.logger = _logger2.default;
            _this.modules = {};
            if (callback && !_this.isInitialized) _this.init(options, callback);
            return _this;
        }
        I18n.prototype.init = function init(options, callback) {
            var _this2 = this;
            if (typeof options === "function") {
                callback = options;
                options = {};
            }
            if (!options) options = {};
            if (options.compatibilityAPI === "v1") {
                this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertAPIOptions(options)), {});
            } else if (options.compatibilityJSON === "v1") {
                this.options = _extends({}, (0, _defaults2.get)(), (0, _defaults2.transformOptions)(compat.convertJSONOptions(options)), {});
            } else {
                this.options = _extends({}, (0, _defaults2.get)(), this.options, (0, _defaults2.transformOptions)(options));
            }
            if (!callback) callback = function callback() {};
            function createClassOnDemand(ClassOrObject) {
                if (!ClassOrObject) return;
                if (typeof ClassOrObject === "function") return new ClassOrObject();
                return ClassOrObject;
            }
            if (!this.options.isClone) {
                if (this.modules.logger) {
                    _logger2.default.init(createClassOnDemand(this.modules.logger), this.options);
                } else {
                    _logger2.default.init(null, this.options);
                }
                var lu = new _LanguageUtils2.default(this.options);
                this.store = new _ResourceStore2.default(this.options.resources, this.options);
                var s = this.services;
                s.logger = _logger2.default;
                s.resourceStore = this.store;
                s.resourceStore.on("added removed", function(lng, ns) {
                    s.cacheConnector.save();
                });
                s.languageUtils = lu;
                s.pluralResolver = new _PluralResolver2.default(lu, {
                    prepend: this.options.pluralSeparator,
                    compatibilityJSON: this.options.compatibilityJSON
                });
                s.interpolator = new _Interpolator2.default(this.options);
                s.backendConnector = new _BackendConnector2.default(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
                s.backendConnector.on("*", function(event) {
                    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                        args[_key - 1] = arguments[_key];
                    }
                    _this2.emit.apply(_this2, [ event ].concat(args));
                });
                s.backendConnector.on("loaded", function(loaded) {
                    s.cacheConnector.save();
                });
                s.cacheConnector = new _CacheConnector2.default(createClassOnDemand(this.modules.cache), s.resourceStore, s, this.options);
                s.cacheConnector.on("*", function(event) {
                    for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                        args[_key2 - 1] = arguments[_key2];
                    }
                    _this2.emit.apply(_this2, [ event ].concat(args));
                });
                if (this.modules.languageDetector) {
                    s.languageDetector = createClassOnDemand(this.modules.languageDetector);
                    s.languageDetector.init(s, this.options.detection, this.options);
                }
                this.translator = new _Translator2.default(this.services, this.options);
                this.translator.on("*", function(event) {
                    for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                        args[_key3 - 1] = arguments[_key3];
                    }
                    _this2.emit.apply(_this2, [ event ].concat(args));
                });
            }
            var storeApi = [ "getResource", "addResource", "addResources", "addResourceBundle", "removeResourceBundle", "hasResourceBundle", "getResourceBundle" ];
            storeApi.forEach(function(fcName) {
                _this2[fcName] = function() {
                    return this.store[fcName].apply(this.store, arguments);
                };
            });
            if (this.options.compatibilityAPI === "v1") compat.appendBackwardsAPI(this);
            var load = function load() {
                _this2.changeLanguage(_this2.options.lng, function(err, t) {
                    _this2.emit("initialized", _this2.options);
                    _this2.logger.log("initialized", _this2.options);
                    callback(err, t);
                });
            };
            if (this.options.resources || !this.options.initImmediate) {
                load();
            } else {
                setTimeout(load, 0);
            }
            return this;
        };
        I18n.prototype.loadResources = function loadResources(callback) {
            var _this3 = this;
            if (!callback) callback = function callback() {};
            if (!this.options.resources) {
                var _ret = function() {
                    if (_this3.language && _this3.language.toLowerCase() === "cimode") return {
                        v: callback()
                    };
                    var toLoad = [];
                    var append = function append(lng) {
                        var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
                        lngs.forEach(function(l) {
                            if (toLoad.indexOf(l) < 0) toLoad.push(l);
                        });
                    };
                    append(_this3.language);
                    if (_this3.options.preload) {
                        _this3.options.preload.forEach(function(l) {
                            append(l);
                        });
                    }
                    _this3.services.cacheConnector.load(toLoad, _this3.options.ns, function() {
                        _this3.services.backendConnector.load(toLoad, _this3.options.ns, callback);
                    });
                }();
                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            } else {
                callback(null);
            }
        };
        I18n.prototype.reloadResources = function reloadResources(lngs, ns) {
            if (!lngs) lngs = this.languages;
            if (!ns) ns = this.options.ns;
            this.services.backendConnector.reload(lngs, ns);
        };
        I18n.prototype.use = function use(module) {
            if (module.type === "backend") {
                this.modules.backend = module;
            }
            if (module.type === "cache") {
                this.modules.cache = module;
            }
            if (module.type === "logger" || module.log && module.warn && module.warn) {
                this.modules.logger = module;
            }
            if (module.type === "languageDetector") {
                this.modules.languageDetector = module;
            }
            if (module.type === "postProcessor") {
                _postProcessor2.default.addPostProcessor(module);
            }
            return this;
        };
        I18n.prototype.changeLanguage = function changeLanguage(lng, callback) {
            var _this4 = this;
            var done = function done(err) {
                if (lng) {
                    _this4.emit("languageChanged", lng);
                    _this4.logger.log("languageChanged", lng);
                }
                if (callback) callback(err, function() {
                    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                        args[_key4] = arguments[_key4];
                    }
                    return _this4.t.apply(_this4, args);
                });
            };
            if (!lng && this.services.languageDetector) lng = this.services.languageDetector.detect();
            if (lng) {
                this.language = lng;
                this.languages = this.services.languageUtils.toResolveHierarchy(lng);
                this.translator.changeLanguage(lng);
                if (this.services.languageDetector) this.services.languageDetector.cacheUserLanguage(lng);
            }
            this.loadResources(function(err) {
                done(err);
            });
        };
        I18n.prototype.getFixedT = function getFixedT(lng, ns) {
            var _this5 = this;
            var fixedT = function fixedT(key, options) {
                options = options || {};
                options.lng = options.lng || fixedT.lng;
                options.ns = options.ns || fixedT.ns;
                return _this5.t(key, options);
            };
            fixedT.lng = lng;
            fixedT.ns = ns;
            return fixedT;
        };
        I18n.prototype.t = function t() {
            return this.translator && this.translator.translate.apply(this.translator, arguments);
        };
        I18n.prototype.exists = function exists() {
            return this.translator && this.translator.exists.apply(this.translator, arguments);
        };
        I18n.prototype.setDefaultNamespace = function setDefaultNamespace(ns) {
            this.options.defaultNS = ns;
        };
        I18n.prototype.loadNamespaces = function loadNamespaces(ns, callback) {
            var _this6 = this;
            if (!this.options.ns) return callback && callback();
            if (typeof ns === "string") ns = [ ns ];
            ns.forEach(function(n) {
                if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
            });
            this.loadResources(callback);
        };
        I18n.prototype.loadLanguages = function loadLanguages(lngs, callback) {
            if (typeof lngs === "string") lngs = [ lngs ];
            var preloaded = this.options.preload || [];
            var newLngs = lngs.filter(function(lng) {
                return preloaded.indexOf(lng) < 0;
            });
            if (!newLngs.length) return callback();
            this.options.preload = preloaded.concat(newLngs);
            this.loadResources(callback);
        };
        I18n.prototype.dir = function dir(lng) {
            if (!lng) lng = this.language;
            if (!lng) return "rtl";
            var rtlLngs = [ "ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam" ];
            return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? "rtl" : "ltr";
        };
        I18n.prototype.createInstance = function createInstance() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];
            return new I18n(options, callback);
        };
        I18n.prototype.cloneInstance = function cloneInstance() {
            var _this7 = this;
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var callback = arguments[1];
            var clone = new I18n(_extends({}, options, this.options, {
                isClone: true
            }), callback);
            var membersToCopy = [ "store", "services", "language" ];
            membersToCopy.forEach(function(m) {
                clone[m] = _this7[m];
            });
            clone.translator = new _Translator2.default(clone.services, clone.options);
            clone.translator.on("*", function(event) {
                for (var _len5 = arguments.length, args = Array(_len5 > 1 ? _len5 - 1 : 0), _key5 = 1; _key5 < _len5; _key5++) {
                    args[_key5 - 1] = arguments[_key5];
                }
                clone.emit.apply(clone, [ event ].concat(args));
            });
            return clone;
        };
        return I18n;
    }(_EventEmitter3.default);
    exports.default = new I18n();
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _EventEmitter2 = __webpack_require__(3);
    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
    var _utils = __webpack_require__(4);
    var utils = _interopRequireWildcard(_utils);
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }
    var ResourceStore = function(_EventEmitter) {
        _inherits(ResourceStore, _EventEmitter);
        function ResourceStore() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                ns: [ "translation" ],
                defaultNS: "translation"
            };
            _classCallCheck(this, ResourceStore);
            var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
            _this.data = data;
            _this.options = options;
            return _this;
        }
        ResourceStore.prototype.addNamespaces = function addNamespaces(ns) {
            if (this.options.ns.indexOf(ns) < 0) {
                this.options.ns.push(ns);
            }
        };
        ResourceStore.prototype.removeNamespaces = function removeNamespaces(ns) {
            var index = this.options.ns.indexOf(ns);
            if (index > -1) {
                this.options.ns.splice(index, 1);
            }
        };
        ResourceStore.prototype.getResource = function getResource(lng, ns, key) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            var keySeparator = options.keySeparator || this.options.keySeparator;
            if (keySeparator === undefined) keySeparator = ".";
            var path = [ lng, ns ];
            if (key && typeof key !== "string") path = path.concat(key);
            if (key && typeof key === "string") path = path.concat(keySeparator ? key.split(keySeparator) : key);
            if (lng.indexOf(".") > -1) {
                path = lng.split(".");
            }
            return utils.getPath(this.data, path);
        };
        ResourceStore.prototype.addResource = function addResource(lng, ns, key, value) {
            var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
                silent: false
            };
            var keySeparator = this.options.keySeparator;
            if (keySeparator === undefined) keySeparator = ".";
            var path = [ lng, ns ];
            if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
            if (lng.indexOf(".") > -1) {
                path = lng.split(".");
                value = ns;
                ns = path[1];
            }
            this.addNamespaces(ns);
            utils.setPath(this.data, path, value);
            if (!options.silent) this.emit("added", lng, ns, key, value);
        };
        ResourceStore.prototype.addResources = function addResources(lng, ns, resources) {
            for (var m in resources) {
                if (typeof resources[m] === "string") this.addResource(lng, ns, m, resources[m], {
                    silent: true
                });
            }
            this.emit("added", lng, ns, resources);
        };
        ResourceStore.prototype.addResourceBundle = function addResourceBundle(lng, ns, resources, deep, overwrite) {
            var path = [ lng, ns ];
            if (lng.indexOf(".") > -1) {
                path = lng.split(".");
                deep = resources;
                resources = ns;
                ns = path[1];
            }
            this.addNamespaces(ns);
            var pack = utils.getPath(this.data, path) || {};
            if (deep) {
                utils.deepExtend(pack, resources, overwrite);
            } else {
                pack = _extends({}, pack, resources);
            }
            utils.setPath(this.data, path, pack);
            this.emit("added", lng, ns, resources);
        };
        ResourceStore.prototype.removeResourceBundle = function removeResourceBundle(lng, ns) {
            if (this.hasResourceBundle(lng, ns)) {
                delete this.data[lng][ns];
            }
            this.removeNamespaces(ns);
            this.emit("removed", lng, ns);
        };
        ResourceStore.prototype.hasResourceBundle = function hasResourceBundle(lng, ns) {
            return this.getResource(lng, ns) !== undefined;
        };
        ResourceStore.prototype.getResourceBundle = function getResourceBundle(lng, ns) {
            if (!ns) ns = this.options.defaultNS;
            if (this.options.compatibilityAPI === "v1") return _extends({}, this.getResource(lng, ns));
            return this.getResource(lng, ns);
        };
        ResourceStore.prototype.toJSON = function toJSON() {
            return this.data;
        };
        return ResourceStore;
    }(_EventEmitter3.default);
    exports.default = ResourceStore;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    var _EventEmitter2 = __webpack_require__(3);
    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
    var _postProcessor = __webpack_require__(9);
    var _postProcessor2 = _interopRequireDefault(_postProcessor);
    var _v = __webpack_require__(10);
    var compat = _interopRequireWildcard(_v);
    var _utils = __webpack_require__(4);
    var utils = _interopRequireWildcard(_utils);
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }
    var Translator = function(_EventEmitter) {
        _inherits(Translator, _EventEmitter);
        function Translator(services) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, Translator);
            var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
            utils.copy([ "resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector" ], services, _this);
            _this.options = options;
            _this.logger = _logger2.default.create("translator");
            return _this;
        }
        Translator.prototype.changeLanguage = function changeLanguage(lng) {
            if (lng) this.language = lng;
        };
        Translator.prototype.exists = function exists(key) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                interpolation: {}
            };
            if (this.options.compatibilityAPI === "v1") {
                options = compat.convertTOptions(options);
            }
            return this.resolve(key, options) !== undefined;
        };
        Translator.prototype.extractFromKey = function extractFromKey(key, options) {
            var nsSeparator = options.nsSeparator || this.options.nsSeparator;
            if (nsSeparator === undefined) nsSeparator = ":";
            var namespaces = options.ns || this.options.defaultNS;
            if (nsSeparator && key.indexOf(nsSeparator) > -1) {
                var parts = key.split(nsSeparator);
                namespaces = parts[0];
                key = parts[1];
            }
            if (typeof namespaces === "string") namespaces = [ namespaces ];
            return {
                key: key,
                namespaces: namespaces
            };
        };
        Translator.prototype.translate = function translate(keys) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            if ((typeof options === "undefined" ? "undefined" : _typeof(options)) !== "object") {
                options = this.options.overloadTranslationOptionHandler(arguments);
            } else if (this.options.compatibilityAPI === "v1") {
                options = compat.convertTOptions(options);
            }
            if (keys === undefined || keys === null || keys === "") return "";
            if (typeof keys === "number") keys = String(keys);
            if (typeof keys === "string") keys = [ keys ];
            var lng = options.lng || this.language;
            if (lng && lng.toLowerCase() === "cimode") return keys[keys.length - 1];
            var keySeparator = options.keySeparator || this.options.keySeparator || ".";
            var _extractFromKey = this.extractFromKey(keys[keys.length - 1], options), key = _extractFromKey.key, namespaces = _extractFromKey.namespaces;
            var namespace = namespaces[namespaces.length - 1];
            var res = this.resolve(keys, options);
            var resType = Object.prototype.toString.apply(res);
            var noObject = [ "[object Number]", "[object Function]", "[object RegExp]" ];
            var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
            if (res && typeof res !== "string" && noObject.indexOf(resType) < 0 && !(joinArrays && resType === "[object Array]")) {
                if (!options.returnObjects && !this.options.returnObjects) {
                    this.logger.warn("accessing an object - but returnObjects options is not enabled!");
                    return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(key, res, options) : "key '" + key + " (" + this.language + ")' returned an object instead of string.";
                }
                var copy = resType === "[object Array]" ? [] : {};
                for (var m in res) {
                    copy[m] = this.translate("" + key + keySeparator + m, _extends({
                        joinArrays: false,
                        ns: namespaces
                    }, options));
                }
                res = copy;
            } else if (joinArrays && resType === "[object Array]") {
                res = res.join(joinArrays);
                if (res) res = this.extendTranslation(res, key, options);
            } else {
                var usedDefault = false, usedKey = false;
                if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
                    usedDefault = true;
                    res = options.defaultValue;
                }
                if (!this.isValidLookup(res)) {
                    usedKey = true;
                    res = key;
                }
                if (usedKey || usedDefault) {
                    this.logger.log("missingKey", lng, namespace, key, res);
                    var lngs = [];
                    var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
                    if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
                        for (var i = 0; i < fallbackLngs.length; i++) {
                            lngs.push(fallbackLngs[i]);
                        }
                    } else if (this.options.saveMissingTo === "all") {
                        lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
                    } else {
                        lngs.push(options.lng || this.language);
                    }
                    if (this.options.saveMissing) {
                        if (this.options.missingKeyHandler) {
                            this.options.missingKeyHandler(lngs, namespace, key, res);
                        } else if (this.backendConnector && this.backendConnector.saveMissing) {
                            this.backendConnector.saveMissing(lngs, namespace, key, res);
                        }
                    }
                    this.emit("missingKey", lngs, namespace, key, res);
                }
                res = this.extendTranslation(res, key, options);
                if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = namespace + ":" + key;
                if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
            }
            return res;
        };
        Translator.prototype.extendTranslation = function extendTranslation(res, key, options) {
            var _this2 = this;
            if (options.interpolation) this.interpolator.init(_extends({}, options, {
                interpolation: _extends({}, this.options.interpolation, options.interpolation)
            }));
            var data = options.replace && typeof options.replace !== "string" ? options.replace : options;
            if (this.options.interpolation.defaultVariables) data = _extends({}, this.options.interpolation.defaultVariables, data);
            res = this.interpolator.interpolate(res, data, this.language);
            res = this.interpolator.nest(res, function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }
                return _this2.translate.apply(_this2, args);
            }, options);
            if (options.interpolation) this.interpolator.reset();
            var postProcess = options.postProcess || this.options.postProcess;
            var postProcessorNames = typeof postProcess === "string" ? [ postProcess ] : postProcess;
            if (res !== undefined && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
                res = _postProcessor2.default.handle(postProcessorNames, res, key, options, this);
            }
            return res;
        };
        Translator.prototype.resolve = function resolve(keys) {
            var _this3 = this;
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var found = void 0;
            if (typeof keys === "string") keys = [ keys ];
            keys.forEach(function(k) {
                if (_this3.isValidLookup(found)) return;
                var _extractFromKey2 = _this3.extractFromKey(k, options), key = _extractFromKey2.key, namespaces = _extractFromKey2.namespaces;
                if (_this3.options.fallbackNS) namespaces = namespaces.concat(_this3.options.fallbackNS);
                var needsPluralHandling = options.count !== undefined && typeof options.count !== "string";
                var needsContextHandling = options.context !== undefined && typeof options.context === "string" && options.context !== "";
                var codes = options.lngs ? options.lngs : _this3.languageUtils.toResolveHierarchy(options.lng || _this3.language);
                namespaces.forEach(function(ns) {
                    if (_this3.isValidLookup(found)) return;
                    codes.forEach(function(code) {
                        if (_this3.isValidLookup(found)) return;
                        var finalKey = key;
                        var finalKeys = [ finalKey ];
                        var pluralSuffix = void 0;
                        if (needsPluralHandling) pluralSuffix = _this3.pluralResolver.getSuffix(code, options.count);
                        if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
                        if (needsContextHandling) finalKeys.push(finalKey += "" + _this3.options.contextSeparator + options.context);
                        if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
                        var possibleKey = void 0;
                        while (possibleKey = finalKeys.pop()) {
                            if (_this3.isValidLookup(found)) continue;
                            found = _this3.getResource(code, ns, possibleKey, options);
                        }
                    });
                });
            });
            return found;
        };
        Translator.prototype.isValidLookup = function isValidLookup(res) {
            return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
        };
        Translator.prototype.getResource = function getResource(code, ns, key) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            return this.resourceStore.getResource(code, ns, key, options);
        };
        return Translator;
    }(_EventEmitter3.default);
    exports.default = Translator;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    var LanguageUtil = function() {
        function LanguageUtil(options) {
            _classCallCheck(this, LanguageUtil);
            this.options = options;
            this.whitelist = this.options.whitelist || false;
            this.logger = _logger2.default.create("languageUtils");
        }
        LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
            if (code.indexOf("-") < 0) return code;
            var specialCases = [ "NB-NO", "NN-NO", "nb-NO", "nn-NO", "nb-no", "nn-no" ];
            var p = code.split("-");
            return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
        };
        LanguageUtil.prototype.getScriptPartFromCode = function getScriptPartFromCode(code) {
            if (code.indexOf("-") < 0) return null;
            var p = code.split("-");
            if (p.length === 2) return null;
            p.pop();
            return this.formatLanguageCode(p.join("-"));
        };
        LanguageUtil.prototype.getLanguagePartFromCode = function getLanguagePartFromCode(code) {
            if (code.indexOf("-") < 0) return code;
            var specialCases = [ "NB-NO", "NN-NO", "nb-NO", "nn-NO", "nb-no", "nn-no" ];
            var p = code.split("-");
            return this.formatLanguageCode(specialCases.indexOf(code) > -1 ? p[1].toLowerCase() : p[0]);
        };
        LanguageUtil.prototype.formatLanguageCode = function formatLanguageCode(code) {
            if (typeof code === "string" && code.indexOf("-") > -1) {
                var specialCases = [ "hans", "hant", "latn", "cyrl", "cans", "mong", "arab" ];
                var p = code.split("-");
                if (this.options.lowerCaseLng) {
                    p = p.map(function(part) {
                        return part.toLowerCase();
                    });
                } else if (p.length === 2) {
                    p[0] = p[0].toLowerCase();
                    p[1] = p[1].toUpperCase();
                    if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
                } else if (p.length === 3) {
                    p[0] = p[0].toLowerCase();
                    if (p[1].length === 2) p[1] = p[1].toUpperCase();
                    if (p[0] !== "sgn" && p[2].length === 2) p[2] = p[2].toUpperCase();
                    if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
                    if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
                }
                return p.join("-");
            } else {
                return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
            }
        };
        LanguageUtil.prototype.isWhitelisted = function isWhitelisted(code, exactMatch) {
            if (this.options.load === "languageOnly" || this.options.nonExplicitWhitelist && !exactMatch) {
                code = this.getLanguagePartFromCode(code);
            }
            return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1 ? true : false;
        };
        LanguageUtil.prototype.getFallbackCodes = function getFallbackCodes(fallbacks, code) {
            if (!fallbacks) return [];
            if (typeof fallbacks === "string") fallbacks = [ fallbacks ];
            if (Object.prototype.toString.apply(fallbacks) === "[object Array]") return fallbacks;
            var found = fallbacks[code];
            if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
            if (!found) found = fallbacks[this.formatLanguageCode(code)];
            if (!found) found = fallbacks.default;
            return found || [];
        };
        LanguageUtil.prototype.toResolveHierarchy = function toResolveHierarchy(code, fallbackCode) {
            var _this = this;
            var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
            var codes = [];
            var addCode = function addCode(code) {
                var exactMatch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
                if (!code) return;
                if (_this.isWhitelisted(code, exactMatch)) {
                    codes.push(code);
                } else {
                    _this.logger.warn("rejecting non-whitelisted language code: " + code);
                }
            };
            if (typeof code === "string" && code.indexOf("-") > -1) {
                if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code), true);
                if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code), true);
                if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
            } else if (typeof code === "string") {
                addCode(this.formatLanguageCode(code));
            }
            fallbackCodes.forEach(function(fc) {
                if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
            });
            return codes;
        };
        return LanguageUtil;
    }();
    exports.default = LanguageUtil;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var sets = [ {
        lngs: [ "ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "tg", "ti", "tr", "uz", "wa" ],
        nr: [ 1, 2 ],
        fc: 1
    }, {
        lngs: [ "af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "es_ar", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "he", "hi", "hu", "hy", "ia", "it", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt", "pt_br", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo" ],
        nr: [ 1, 2 ],
        fc: 2
    }, {
        lngs: [ "ay", "bo", "cgg", "fa", "id", "ja", "jbo", "ka", "kk", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh" ],
        nr: [ 1 ],
        fc: 3
    }, {
        lngs: [ "be", "bs", "dz", "hr", "ru", "sr", "uk" ],
        nr: [ 1, 2, 5 ],
        fc: 4
    }, {
        lngs: [ "ar" ],
        nr: [ 0, 1, 2, 3, 11, 100 ],
        fc: 5
    }, {
        lngs: [ "cs", "sk" ],
        nr: [ 1, 2, 5 ],
        fc: 6
    }, {
        lngs: [ "csb", "pl" ],
        nr: [ 1, 2, 5 ],
        fc: 7
    }, {
        lngs: [ "cy" ],
        nr: [ 1, 2, 3, 8 ],
        fc: 8
    }, {
        lngs: [ "fr" ],
        nr: [ 1, 2 ],
        fc: 9
    }, {
        lngs: [ "ga" ],
        nr: [ 1, 2, 3, 7, 11 ],
        fc: 10
    }, {
        lngs: [ "gd" ],
        nr: [ 1, 2, 3, 20 ],
        fc: 11
    }, {
        lngs: [ "is" ],
        nr: [ 1, 2 ],
        fc: 12
    }, {
        lngs: [ "jv" ],
        nr: [ 0, 1 ],
        fc: 13
    }, {
        lngs: [ "kw" ],
        nr: [ 1, 2, 3, 4 ],
        fc: 14
    }, {
        lngs: [ "lt" ],
        nr: [ 1, 2, 10 ],
        fc: 15
    }, {
        lngs: [ "lv" ],
        nr: [ 1, 2, 0 ],
        fc: 16
    }, {
        lngs: [ "mk" ],
        nr: [ 1, 2 ],
        fc: 17
    }, {
        lngs: [ "mnk" ],
        nr: [ 0, 1, 2 ],
        fc: 18
    }, {
        lngs: [ "mt" ],
        nr: [ 1, 2, 11, 20 ],
        fc: 19
    }, {
        lngs: [ "or" ],
        nr: [ 2, 1 ],
        fc: 2
    }, {
        lngs: [ "ro" ],
        nr: [ 1, 2, 20 ],
        fc: 20
    }, {
        lngs: [ "sl" ],
        nr: [ 5, 1, 2, 3 ],
        fc: 21
    } ];
    var _rulesPluralsTypes = {
        1: function _(n) {
            return Number(n > 1);
        },
        2: function _(n) {
            return Number(n != 1);
        },
        3: function _(n) {
            return 0;
        },
        4: function _(n) {
            return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        },
        5: function _(n) {
            return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
        },
        6: function _(n) {
            return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
        },
        7: function _(n) {
            return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        },
        8: function _(n) {
            return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
        },
        9: function _(n) {
            return Number(n >= 2);
        },
        10: function _(n) {
            return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
        },
        11: function _(n) {
            return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
        },
        12: function _(n) {
            return Number(n % 10 != 1 || n % 100 == 11);
        },
        13: function _(n) {
            return Number(n !== 0);
        },
        14: function _(n) {
            return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
        },
        15: function _(n) {
            return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
        },
        16: function _(n) {
            return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
        },
        17: function _(n) {
            return Number(n == 1 || n % 10 == 1 ? 0 : 1);
        },
        18: function _(n) {
            return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
        },
        19: function _(n) {
            return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
        },
        20: function _(n) {
            return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
        },
        21: function _(n) {
            return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
        }
    };
    function createRules() {
        var l, rules = {};
        sets.forEach(function(set) {
            set.lngs.forEach(function(l) {
                return rules[l] = {
                    numbers: set.nr,
                    plurals: _rulesPluralsTypes[set.fc]
                };
            });
        });
        return rules;
    }
    var PluralResolver = function() {
        function PluralResolver(languageUtils) {
            var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            _classCallCheck(this, PluralResolver);
            this.languageUtils = languageUtils;
            this.options = options;
            this.logger = _logger2.default.create("pluralResolver");
            this.rules = createRules();
        }
        PluralResolver.prototype.addRule = function addRule(lng, obj) {
            this.rules[lng] = obj;
        };
        PluralResolver.prototype.getRule = function getRule(code) {
            return this.rules[this.languageUtils.getLanguagePartFromCode(code)];
        };
        PluralResolver.prototype.needsPlural = function needsPlural(code) {
            var rule = this.getRule(code);
            return rule && rule.numbers.length <= 1 ? false : true;
        };
        PluralResolver.prototype.getSuffix = function getSuffix(code, count) {
            var _this = this;
            var rule = this.getRule(code);
            if (rule) {
                var _ret = function() {
                    if (rule.numbers.length === 1) return {
                        v: ""
                    };
                    var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
                    var suffix = rule.numbers[idx];
                    if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
                        if (suffix === 2) {
                            suffix = "plural";
                        } else if (suffix === 1) {
                            suffix = "";
                        }
                    }
                    var returnSuffix = function returnSuffix() {
                        return _this.options.prepend && suffix.toString() ? _this.options.prepend + suffix.toString() : suffix.toString();
                    };
                    if (_this.options.compatibilityJSON === "v1") {
                        if (suffix === 1) return {
                            v: ""
                        };
                        if (typeof suffix === "number") return {
                            v: "_plural_" + suffix.toString()
                        };
                        return {
                            v: returnSuffix()
                        };
                    } else if (_this.options.compatibilityJSON === "v2" || rule.numbers.length === 2 && rule.numbers[0] === 1) {
                        return {
                            v: returnSuffix()
                        };
                    } else if (rule.numbers.length === 2 && rule.numbers[0] === 1) {
                        return {
                            v: returnSuffix()
                        };
                    }
                    return {
                        v: _this.options.prepend && idx.toString() ? _this.options.prepend + idx.toString() : idx.toString()
                    };
                }();
                if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
            } else {
                this.logger.warn("no plural rule found for: " + code);
                return "";
            }
        };
        return PluralResolver;
    }();
    exports.default = PluralResolver;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _utils = __webpack_require__(4);
    var utils = _interopRequireWildcard(_utils);
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    var Interpolator = function() {
        function Interpolator() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            _classCallCheck(this, Interpolator);
            this.logger = _logger2.default.create("interpolator");
            this.init(options, true);
        }
        Interpolator.prototype.init = function init() {
            var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var reset = arguments[1];
            if (reset) {
                this.options = options;
                this.format = options.interpolation && options.interpolation.format || function(value) {
                    return value;
                };
            }
            if (!options.interpolation) options.interpolation = {
                escapeValue: true
            };
            var iOpts = options.interpolation;
            this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
            this.prefix = iOpts.prefix ? utils.regexEscape(iOpts.prefix) : iOpts.prefixEscaped || "{{";
            this.suffix = iOpts.suffix ? utils.regexEscape(iOpts.suffix) : iOpts.suffixEscaped || "}}";
            this.formatSeparator = iOpts.formatSeparator ? utils.regexEscape(iOpts.formatSeparator) : iOpts.formatSeparator || ",";
            this.unescapePrefix = iOpts.unescapeSuffix ? "" : iOpts.unescapePrefix || "-";
            this.unescapeSuffix = this.unescapePrefix ? "" : iOpts.unescapeSuffix || "";
            this.nestingPrefix = iOpts.nestingPrefix ? utils.regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || utils.regexEscape("$t(");
            this.nestingSuffix = iOpts.nestingSuffix ? utils.regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || utils.regexEscape(")");
            this.resetRegExp();
        };
        Interpolator.prototype.reset = function reset() {
            if (this.options) this.init(this.options);
        };
        Interpolator.prototype.resetRegExp = function resetRegExp() {
            var regexpStr = this.prefix + "(.+?)" + this.suffix;
            this.regexp = new RegExp(regexpStr, "g");
            var regexpUnescapeStr = this.prefix + this.unescapePrefix + "(.+?)" + this.unescapeSuffix + this.suffix;
            this.regexpUnescape = new RegExp(regexpUnescapeStr, "g");
            var nestingRegexpStr = this.nestingPrefix + "(.+?)" + this.nestingSuffix;
            this.nestingRegexp = new RegExp(nestingRegexpStr, "g");
        };
        Interpolator.prototype.interpolate = function interpolate(str, data, lng) {
            var _this = this;
            var match = void 0, value = void 0;
            function regexSafe(val) {
                return val.replace(/\$/g, "$$$$");
            }
            var handleFormat = function handleFormat(key) {
                if (key.indexOf(_this.formatSeparator) < 0) return utils.getPath(data, key);
                var p = key.split(_this.formatSeparator);
                var k = p.shift().trim();
                var f = p.join(_this.formatSeparator).trim();
                return _this.format(utils.getPath(data, k), f, lng);
            };
            this.resetRegExp();
            while (match = this.regexpUnescape.exec(str)) {
                var _value = handleFormat(match[1].trim());
                str = str.replace(match[0], _value);
                this.regexpUnescape.lastIndex = 0;
            }
            while (match = this.regexp.exec(str)) {
                value = handleFormat(match[1].trim());
                if (typeof value !== "string") value = utils.makeString(value);
                if (!value) {
                    this.logger.warn("missed to pass in variable " + match[1] + " for interpolating " + str);
                    value = "";
                }
                value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
                str = str.replace(match[0], value);
                this.regexp.lastIndex = 0;
            }
            return str;
        };
        Interpolator.prototype.nest = function nest(str, fc) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var match = void 0, value = void 0;
            var clonedOptions = JSON.parse(JSON.stringify(options));
            clonedOptions.applyPostProcessor = false;
            function regexSafe(val) {
                return val.replace(/\$/g, "$$$$");
            }
            function handleHasOptions(key) {
                if (key.indexOf(",") < 0) return key;
                var p = key.split(",");
                key = p.shift();
                var optionsString = p.join(",");
                optionsString = this.interpolate(optionsString, clonedOptions);
                try {
                    clonedOptions = JSON.parse(optionsString);
                } catch (e) {
                    this.logger.error("failed parsing options string in nesting for key " + key, e);
                }
                return key;
            }
            while (match = this.nestingRegexp.exec(str)) {
                value = fc(handleHasOptions.call(this, match[1].trim()), clonedOptions);
                if (typeof value !== "string") value = utils.makeString(value);
                if (!value) {
                    this.logger.warn("missed to pass in variable " + match[1] + " for interpolating " + str);
                    value = "";
                }
                value = this.escapeValue ? regexSafe(utils.escape(value)) : regexSafe(value);
                str = str.replace(match[0], value);
                this.regexp.lastIndex = 0;
            }
            return str;
        };
        return Interpolator;
    }();
    exports.default = Interpolator;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _slicedToArray = function() {
        function sliceIterator(arr, i) {
            var _arr = [];
            var _n = true;
            var _d = false;
            var _e = undefined;
            try {
                for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"]) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }
        return function(arr, i) {
            if (Array.isArray(arr)) {
                return arr;
            } else if (Symbol.iterator in Object(arr)) {
                return sliceIterator(arr, i);
            } else {
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            }
        };
    }();
    var _utils = __webpack_require__(4);
    var utils = _interopRequireWildcard(_utils);
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    var _EventEmitter2 = __webpack_require__(3);
    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }
    function remove(arr, what) {
        var found = arr.indexOf(what);
        while (found !== -1) {
            arr.splice(found, 1);
            found = arr.indexOf(what);
        }
    }
    var Connector = function(_EventEmitter) {
        _inherits(Connector, _EventEmitter);
        function Connector(backend, store, services) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            _classCallCheck(this, Connector);
            var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
            _this.backend = backend;
            _this.store = store;
            _this.services = services;
            _this.options = options;
            _this.logger = _logger2.default.create("backendConnector");
            _this.state = {};
            _this.queue = [];
            _this.backend && _this.backend.init && _this.backend.init(services, options.backend, options);
            return _this;
        }
        Connector.prototype.queueLoad = function queueLoad(languages, namespaces, callback) {
            var _this2 = this;
            var toLoad = [], pending = [], toLoadLanguages = [], toLoadNamespaces = [];
            languages.forEach(function(lng) {
                var hasAllNamespaces = true;
                namespaces.forEach(function(ns) {
                    var name = lng + "|" + ns;
                    if (_this2.store.hasResourceBundle(lng, ns)) {
                        _this2.state[name] = 2;
                    } else if (_this2.state[name] < 0) {} else if (_this2.state[name] === 1) {
                        if (pending.indexOf(name) < 0) pending.push(name);
                    } else {
                        _this2.state[name] = 1;
                        hasAllNamespaces = false;
                        if (pending.indexOf(name) < 0) pending.push(name);
                        if (toLoad.indexOf(name) < 0) toLoad.push(name);
                        if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
                    }
                });
                if (!hasAllNamespaces) toLoadLanguages.push(lng);
            });
            if (toLoad.length || pending.length) {
                this.queue.push({
                    pending: pending,
                    loaded: {},
                    errors: [],
                    callback: callback
                });
            }
            return {
                toLoad: toLoad,
                pending: pending,
                toLoadLanguages: toLoadLanguages,
                toLoadNamespaces: toLoadNamespaces
            };
        };
        Connector.prototype.loaded = function loaded(name, err, data) {
            var _this3 = this;
            var _name$split = name.split("|"), _name$split2 = _slicedToArray(_name$split, 2), lng = _name$split2[0], ns = _name$split2[1];
            if (err) this.emit("failedLoading", lng, ns, err);
            if (data) {
                this.store.addResourceBundle(lng, ns, data);
            }
            this.state[name] = err ? -1 : 2;
            this.queue.forEach(function(q) {
                utils.pushPath(q.loaded, [ lng ], ns);
                remove(q.pending, name);
                if (err) q.errors.push(err);
                if (q.pending.length === 0 && !q.done) {
                    q.errors.length ? q.callback(q.errors) : q.callback();
                    _this3.emit("loaded", q.loaded);
                    q.done = true;
                }
            });
            this.queue = this.queue.filter(function(q) {
                return !q.done;
            });
        };
        Connector.prototype.read = function read(lng, ns, fcName, tried, wait, callback) {
            var _this4 = this;
            if (!tried) tried = 0;
            if (!wait) wait = 250;
            if (!lng.length) return callback(null, {});
            this.backend[fcName](lng, ns, function(err, data) {
                if (err && data && tried < 5) {
                    setTimeout(function() {
                        _this4.read.call(_this4, lng, ns, fcName, ++tried, wait * 2, callback);
                    }, wait);
                    return;
                }
                callback(err, data);
            });
        };
        Connector.prototype.load = function load(languages, namespaces, callback) {
            var _this5 = this;
            if (!this.backend) {
                this.logger.warn("No backend was added via i18next.use. Will not load resources.");
                return callback && callback();
            }
            var options = _extends({}, this.backend.options, this.options.backend);
            if (typeof languages === "string") languages = this.services.languageUtils.toResolveHierarchy(languages);
            if (typeof namespaces === "string") namespaces = [ namespaces ];
            var toLoad = this.queueLoad(languages, namespaces, callback);
            if (!toLoad.toLoad.length) {
                if (!toLoad.pending.length) callback();
                return;
            }
            if (options.allowMultiLoading && this.backend.readMulti) {
                this.read(toLoad.toLoadLanguages, toLoad.toLoadNamespaces, "readMulti", null, null, function(err, data) {
                    if (err) _this5.logger.warn("loading namespaces " + toLoad.toLoadNamespaces.join(", ") + " for languages " + toLoad.toLoadLanguages.join(", ") + " via multiloading failed", err);
                    if (!err && data) _this5.logger.log("loaded namespaces " + toLoad.toLoadNamespaces.join(", ") + " for languages " + toLoad.toLoadLanguages.join(", ") + " via multiloading", data);
                    toLoad.toLoad.forEach(function(name) {
                        var _name$split3 = name.split("|"), _name$split4 = _slicedToArray(_name$split3, 2), l = _name$split4[0], n = _name$split4[1];
                        var bundle = utils.getPath(data, [ l, n ]);
                        if (bundle) {
                            _this5.loaded(name, err, bundle);
                        } else {
                            var _err = "loading namespace " + n + " for language " + l + " via multiloading failed";
                            _this5.loaded(name, _err);
                            _this5.logger.error(_err);
                        }
                    });
                });
            } else {
                (function() {
                    var readOne = function readOne(name) {
                        var _this6 = this;
                        var _name$split5 = name.split("|"), _name$split6 = _slicedToArray(_name$split5, 2), lng = _name$split6[0], ns = _name$split6[1];
                        this.read(lng, ns, "read", null, null, function(err, data) {
                            if (err) _this6.logger.warn("loading namespace " + ns + " for language " + lng + " failed", err);
                            if (!err && data) _this6.logger.log("loaded namespace " + ns + " for language " + lng, data);
                            _this6.loaded(name, err, data);
                        });
                    };
                    toLoad.toLoad.forEach(function(name) {
                        readOne.call(_this5, name);
                    });
                })();
            }
        };
        Connector.prototype.reload = function reload(languages, namespaces) {
            var _this7 = this;
            if (!this.backend) {
                this.logger.warn("No backend was added via i18next.use. Will not load resources.");
            }
            var options = _extends({}, this.backend.options, this.options.backend);
            if (typeof languages === "string") languages = this.services.languageUtils.toResolveHierarchy(languages);
            if (typeof namespaces === "string") namespaces = [ namespaces ];
            if (options.allowMultiLoading && this.backend.readMulti) {
                this.read(languages, namespaces, "readMulti", null, null, function(err, data) {
                    if (err) _this7.logger.warn("reloading namespaces " + namespaces.join(", ") + " for languages " + languages.join(", ") + " via multiloading failed", err);
                    if (!err && data) _this7.logger.log("reloaded namespaces " + namespaces.join(", ") + " for languages " + languages.join(", ") + " via multiloading", data);
                    languages.forEach(function(l) {
                        namespaces.forEach(function(n) {
                            var bundle = utils.getPath(data, [ l, n ]);
                            if (bundle) {
                                _this7.loaded(l + "|" + n, err, bundle);
                            } else {
                                var _err2 = "reloading namespace " + n + " for language " + l + " via multiloading failed";
                                _this7.loaded(l + "|" + n, _err2);
                                _this7.logger.error(_err2);
                            }
                        });
                    });
                });
            } else {
                (function() {
                    var readOne = function readOne(name) {
                        var _this8 = this;
                        var _name$split7 = name.split("|"), _name$split8 = _slicedToArray(_name$split7, 2), lng = _name$split8[0], ns = _name$split8[1];
                        this.read(lng, ns, "read", null, null, function(err, data) {
                            if (err) _this8.logger.warn("reloading namespace " + ns + " for language " + lng + " failed", err);
                            if (!err && data) _this8.logger.log("reloaded namespace " + ns + " for language " + lng, data);
                            _this8.loaded(name, err, data);
                        });
                    };
                    languages.forEach(function(l) {
                        namespaces.forEach(function(n) {
                            readOne.call(_this7, l + "|" + n);
                        });
                    });
                })();
            }
        };
        Connector.prototype.saveMissing = function saveMissing(languages, namespace, key, fallbackValue) {
            if (this.backend && this.backend.create) this.backend.create(languages, namespace, key, fallbackValue);
            if (!languages || !languages[0]) return;
            this.store.addResource(languages[0], namespace, key, fallbackValue);
        };
        return Connector;
    }(_EventEmitter3.default);
    exports.default = Connector;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key];
                }
            }
        }
        return target;
    };
    var _utils = __webpack_require__(4);
    var utils = _interopRequireWildcard(_utils);
    var _logger = __webpack_require__(0);
    var _logger2 = _interopRequireDefault(_logger);
    var _EventEmitter2 = __webpack_require__(3);
    var _EventEmitter3 = _interopRequireDefault(_EventEmitter2);
    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
                }
            }
            newObj.default = obj;
            return newObj;
        }
    }
    function _defaults(obj, defaults) {
        var keys = Object.getOwnPropertyNames(defaults);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = Object.getOwnPropertyDescriptor(defaults, key);
            if (value && value.configurable && obj[key] === undefined) {
                Object.defineProperty(obj, key, value);
            }
        }
        return obj;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }
        return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
            throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass);
    }
    var Connector = function(_EventEmitter) {
        _inherits(Connector, _EventEmitter);
        function Connector(cache, store, services) {
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
            _classCallCheck(this, Connector);
            var _this = _possibleConstructorReturn(this, _EventEmitter.call(this));
            _this.cache = cache;
            _this.store = store;
            _this.services = services;
            _this.options = options;
            _this.logger = _logger2.default.create("cacheConnector");
            _this.cache && _this.cache.init && _this.cache.init(services, options.cache, options);
            return _this;
        }
        Connector.prototype.load = function load(languages, namespaces, callback) {
            var _this2 = this;
            if (!this.cache) return callback && callback();
            var options = _extends({}, this.cache.options, this.options.cache);
            if (typeof languages === "string") languages = this.services.languageUtils.toResolveHierarchy(languages);
            if (typeof namespaces === "string") namespaces = [ namespaces ];
            if (options.enabled) {
                this.cache.load(languages, function(err, data) {
                    if (err) _this2.logger.error("loading languages " + languages.join(", ") + " from cache failed", err);
                    if (data) {
                        for (var l in data) {
                            for (var n in data[l]) {
                                if (n === "i18nStamp") continue;
                                var bundle = data[l][n];
                                if (bundle) _this2.store.addResourceBundle(l, n, bundle);
                            }
                        }
                    }
                    if (callback) callback();
                });
            } else {
                if (callback) callback();
            }
        };
        Connector.prototype.save = function save() {
            if (this.cache && this.options.cache && this.options.cache.enabled) this.cache.save(this.store.data);
        };
        return Connector;
    }(_EventEmitter3.default);
    exports.default = Connector;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.get = get;
    exports.transformOptions = transformOptions;
    function get() {
        return {
            debug: false,
            initImmediate: true,
            ns: [ "translation" ],
            defaultNS: [ "translation" ],
            fallbackLng: [ "dev" ],
            fallbackNS: false,
            whitelist: false,
            nonExplicitWhitelist: false,
            load: "all",
            preload: false,
            keySeparator: ".",
            nsSeparator: ":",
            pluralSeparator: "_",
            contextSeparator: "_",
            saveMissing: false,
            saveMissingTo: "fallback",
            missingKeyHandler: false,
            postProcess: false,
            returnNull: true,
            returnEmptyString: true,
            returnObjects: false,
            joinArrays: false,
            returnedObjectHandler: function returnedObjectHandler() {},
            parseMissingKeyHandler: false,
            appendNamespaceToMissingKey: false,
            overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
                return {
                    defaultValue: args[1]
                };
            },
            interpolation: {
                escapeValue: true,
                format: function format(value, _format, lng) {
                    return value;
                },
                prefix: "{{",
                suffix: "}}",
                formatSeparator: ",",
                unescapePrefix: "-",
                nestingPrefix: "$t(",
                nestingSuffix: ")",
                defaultVariables: undefined
            }
        };
    }
    function transformOptions(options) {
        if (typeof options.ns === "string") options.ns = [ options.ns ];
        if (typeof options.fallbackLng === "string") options.fallbackLng = [ options.fallbackLng ];
        if (typeof options.fallbackNS === "string") options.fallbackNS = [ options.fallbackNS ];
        if (options.whitelist && options.whitelist.indexOf("cimode") < 0) options.whitelist.push("cimode");
        return options;
    }
}, function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(36).default;
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
    } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
    };
    var _sprintf = __webpack_require__(37);
    exports.default = {
        name: "sprintf",
        type: "postProcessor",
        process: function process(value, key, options) {
            if (!options.sprintf) return value;
            if (Object.prototype.toString.apply(options.sprintf) === "[object Array]") {
                return (0, _sprintf.vsprintf)(value, options.sprintf);
            } else if (_typeof(options.sprintf) === "object") {
                return (0, _sprintf.sprintf)(value, options.sprintf);
            }
            return value;
        },
        overloadTranslationOptionHandler: function overloadTranslationOptionHandler(args) {
            var values = [];
            for (var i = 1; i < args.length; i++) {
                values.push(args[i]);
            }
            return {
                postProcess: "sprintf",
                sprintf: values
            };
        }
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.sprintf = sprintf;
    exports.vsprintf = vsprintf;
    var re = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    };
    function sprintf() {
        var key = arguments[0], cache = sprintf.cache;
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key);
        }
        return sprintf.format.call(null, cache[key], arguments);
    }
    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = "";
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i]);
            if (node_type === "string") {
                output[output.length] = parse_tree[i];
            } else if (node_type === "array") {
                match = parse_tree[i];
                if (match[2]) {
                    arg = argv[cursor];
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]));
                        }
                        arg = arg[match[2][k]];
                    }
                } else if (match[1]) {
                    arg = argv[match[1]];
                } else {
                    arg = argv[cursor++];
                }
                if (get_type(arg) == "function") {
                    arg = arg();
                }
                if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && get_type(arg) != "number" && isNaN(arg)) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)));
                }
                if (re.number.test(match[8])) {
                    is_positive = arg >= 0;
                }
                switch (match[8]) {
                  case "b":
                    arg = arg.toString(2);
                    break;

                  case "c":
                    arg = String.fromCharCode(arg);
                    break;

                  case "d":
                  case "i":
                    arg = parseInt(arg, 10);
                    break;

                  case "j":
                    arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0);
                    break;

                  case "e":
                    arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential();
                    break;

                  case "f":
                    arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg);
                    break;

                  case "g":
                    arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg);
                    break;

                  case "o":
                    arg = arg.toString(8);
                    break;

                  case "s":
                    arg = (arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg;
                    break;

                  case "u":
                    arg = arg >>> 0;
                    break;

                  case "x":
                    arg = arg.toString(16);
                    break;

                  case "X":
                    arg = arg.toString(16).toUpperCase();
                    break;
                }
                if (re.json.test(match[8])) {
                    output[output.length] = arg;
                } else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? "+" : "-";
                        arg = arg.toString().replace(re.sign, "");
                    } else {
                        sign = "";
                    }
                    pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " ";
                    pad_length = match[6] - (sign + arg).length;
                    pad = match[6] ? pad_length > 0 ? str_repeat(pad_character, pad_length) : "" : "";
                    output[output.length] = match[5] ? sign + arg + pad : pad_character === "0" ? sign + pad + arg : pad + sign + arg;
                }
            }
        }
        return output.join("");
    };
    sprintf.cache = {};
    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0];
            } else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%";
            } else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1;
                    var field_list = [], replacement_field = match[2], field_match = [];
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1];
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1];
                            } else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1];
                            } else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key");
                            }
                        }
                    } else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key");
                    }
                    match[2] = field_list;
                } else {
                    arg_names |= 2;
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                }
                parse_tree[parse_tree.length] = match;
            } else {
                throw new SyntaxError("[sprintf] unexpected placeholder");
            }
            _fmt = _fmt.substring(match[0].length);
        }
        return parse_tree;
    };
    function vsprintf(fmt, argv, _argv) {
        _argv = (argv || []).slice(0);
        _argv.splice(0, 0, fmt);
        return sprintf.apply(null, _argv);
    }
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }
    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input);
    }
}, function(module, exports, __webpack_require__) {
    "use strict";
    const packageInfo = __webpack_require__(39);
    const attributesHelper = __webpack_require__(11);
    module.exports = function() {
        return {
            ":tell": function(speechOutput) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    shouldEndSession: true
                });
                this.emit(":responseReady");
            },
            ":ask": function(speechOutput, repromptSpeech) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":askWithCard": function(speechOutput, repromptSpeech, cardTitle, cardContent, imageObj) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    cardTitle: cardTitle,
                    cardContent: cardContent,
                    cardImage: imageObj,
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":tellWithCard": function(speechOutput, cardTitle, cardContent, imageObj) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    cardTitle: cardTitle,
                    cardContent: cardContent,
                    cardImage: imageObj,
                    shouldEndSession: true
                });
                this.emit(":responseReady");
            },
            ":tellWithLinkAccountCard": function(speechOutput) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    cardType: "LinkAccount",
                    shouldEndSession: true
                });
                this.emit(":responseReady");
            },
            ":askWithLinkAccountCard": function(speechOutput, repromptSpeech) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    cardType: "LinkAccount",
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":askWithPermissionCard": function(speechOutput, repromptSpeech, permissions) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    permissions: permissions,
                    cardType: "AskForPermissionsConsent",
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":tellWithPermissionCard": function(speechOutput, permissions) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    permissions: permissions,
                    cardType: "AskForPermissionsConsent",
                    shouldEndSession: true
                });
                this.emit(":responseReady");
            },
            ":delegate": function(updatedIntent) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    directives: getDialogDirectives("Dialog.Delegate", updatedIntent, null),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":elicitSlot": function(slotName, speechOutput, repromptSpeech, updatedIntent) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    directives: getDialogDirectives("Dialog.ElicitSlot", updatedIntent, slotName),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":elicitSlotWithCard": function(slotName, speechOutput, repromptSpeech, cardTitle, cardContent, updatedIntent, imageObj) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    cardTitle: cardTitle,
                    cardContent: cardContent,
                    cardImage: imageObj,
                    directives: getDialogDirectives("Dialog.ElicitSlot", updatedIntent, slotName),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":confirmSlot": function(slotName, speechOutput, repromptSpeech, updatedIntent) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    directives: getDialogDirectives("Dialog.ConfirmSlot", updatedIntent, slotName),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":confirmSlotWithCard": function(slotName, speechOutput, repromptSpeech, cardTitle, cardContent, updatedIntent, imageObj) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    cardTitle: cardTitle,
                    cardContent: cardContent,
                    cardImage: imageObj,
                    directives: getDialogDirectives("Dialog.ConfirmSlot", updatedIntent, slotName),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":confirmIntent": function(speechOutput, repromptSpeech, updatedIntent) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    directives: getDialogDirectives("Dialog.ConfirmIntent", updatedIntent, null),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":confirmIntentWithCard": function(speechOutput, repromptSpeech, cardTitle, cardContent, updatedIntent, imageObj) {
                if (this.isOverridden()) {
                    return;
                }
                this.handler.response = buildSpeechletResponse({
                    sessionAttributes: this.attributes,
                    output: getSSMLResponse(speechOutput),
                    reprompt: getSSMLResponse(repromptSpeech),
                    cardTitle: cardTitle,
                    cardContent: cardContent,
                    cardImage: imageObj,
                    directives: getDialogDirectives("Dialog.ConfirmIntent", updatedIntent, null),
                    shouldEndSession: false
                });
                this.emit(":responseReady");
            },
            ":responseReady": function() {
                if (this.isOverridden()) {
                    return;
                }
                if (this.handler.state) {
                    this.handler.response.sessionAttributes.STATE = this.handler.state;
                }
                this.handler.response.userAgent = `ask-nodejs/${packageInfo.version} Node/${process.version}`;
                if (this.handler.dynamoDBTableName) {
                    return this.emit(":saveState");
                }
                if (typeof this.callback === "undefined") {
                    this.context.succeed(this.handler.response);
                } else {
                    this.callback(null, this.handler.response);
                }
            },
            ":saveState": function(forceSave) {
                if (this.isOverridden()) {
                    return;
                }
                if (forceSave && this.handler.state) {
                    this.attributes.STATE = this.handler.state;
                }
                let userId = "";
                if (this.event.context) {
                    userId = this.event.context.System.user.userId;
                } else if (this.event.session) {
                    userId = this.event.session.user.userId;
                }
                if (this.handler.saveBeforeResponse || forceSave || this.handler.response.response.shouldEndSession) {
                    attributesHelper(this.dynamoDBClient).set(this.handler.dynamoDBTableName, userId, this.attributes, err => {
                        if (err) {
                            return this.emit(":saveStateError", err);
                        }
                        if (Object.keys(this.handler.response).length === 0 && this.handler.response.constructor === Object) {
                            this.handler.response = true;
                        }
                        if (typeof this.callback === "undefined") {
                            this.context.succeed(this.handler.response);
                        } else {
                            this.callback(null, this.handler.response);
                        }
                    });
                } else {
                    if (typeof this.callback === "undefined") {
                        this.context.succeed(this.handler.response || true);
                    } else {
                        this.callback(null, this.handler.response || true);
                    }
                }
            },
            ":saveStateError": function(err) {
                if (this.isOverridden()) {
                    return;
                }
                console.log(`Error saving state: ${err}\n${err.stack}`);
                if (typeof this.callback === "undefined") {
                    this.context.fail(err);
                } else {
                    this.callback(err);
                }
            }
        };
    }();
    function createSpeechObject(optionsParam) {
        if (optionsParam && optionsParam.type === "SSML") {
            return {
                type: optionsParam.type,
                ssml: optionsParam.speech
            };
        } else {
            return {
                type: optionsParam.type || "PlainText",
                text: optionsParam.speech || optionsParam
            };
        }
    }
    function buildSpeechletResponse(options) {
        const alexaResponse = {
            shouldEndSession: options.shouldEndSession
        };
        if (options.output) {
            alexaResponse.outputSpeech = createSpeechObject(options.output);
        }
        if (options.reprompt) {
            alexaResponse.reprompt = {
                outputSpeech: createSpeechObject(options.reprompt)
            };
        }
        if (options.directives) {
            alexaResponse.directives = options.directives;
        }
        if (options.cardTitle && options.cardContent) {
            alexaResponse.card = {
                type: "Simple",
                title: options.cardTitle,
                content: options.cardContent
            };
            if (options.cardImage && (options.cardImage.smallImageUrl || options.cardImage.largeImageUrl)) {
                alexaResponse.card.type = "Standard";
                alexaResponse.card.image = {};
                delete alexaResponse.card.content;
                alexaResponse.card.text = options.cardContent;
                if (options.cardImage.smallImageUrl) {
                    alexaResponse.card.image.smallImageUrl = options.cardImage.smallImageUrl;
                }
                if (options.cardImage.largeImageUrl) {
                    alexaResponse.card.image.largeImageUrl = options.cardImage.largeImageUrl;
                }
            }
        } else if (options.cardType === "LinkAccount") {
            alexaResponse.card = {
                type: "LinkAccount"
            };
        } else if (options.cardType === "AskForPermissionsConsent") {
            alexaResponse.card = {
                type: "AskForPermissionsConsent",
                permissions: options.permissions
            };
        }
        const returnResult = {
            version: "1.0",
            response: alexaResponse
        };
        if (options.sessionAttributes) {
            returnResult.sessionAttributes = options.sessionAttributes;
        }
        return returnResult;
    }
    function getSSMLResponse(message) {
        if (message == null) {
            return null;
        } else {
            return {
                type: "SSML",
                speech: `<speak> ${message} </speak>`
            };
        }
    }
    function getDialogDirectives(dialogType, updatedIntent, slotName) {
        let directive = {
            type: dialogType
        };
        if (dialogType === "Dialog.ElicitSlot") {
            directive.slotToElicit = slotName;
        } else if (dialogType === "Dialog.ConfirmSlot") {
            directive.slotToConfirm = slotName;
        }
        if (updatedIntent) {
            directive.updatedIntent = updatedIntent;
        }
        return [ directive ];
    }
}, function(module, exports) {
    module.exports = {
        _from: "alexa-sdk@^1.0.25",
        _id: "alexa-sdk@1.0.25",
        _inBundle: false,
        _integrity: "sha512-+FVFNi+mxBZm2HL+oi5u4JTNjQ2uDs4Tp9eqcWIxL3AAD+AU4a6gWpu6LEjxIVCqaI1Ro/RyDm3mnJZA9g6G8w==",
        _location: "/alexa-sdk",
        _phantomChildren: {},
        _requested: {
            type: "range",
            registry: true,
            raw: "alexa-sdk@^1.0.25",
            name: "alexa-sdk",
            escapedName: "alexa-sdk",
            rawSpec: "^1.0.25",
            saveSpec: null,
            fetchSpec: "^1.0.25"
        },
        _requiredBy: [ "#USER", "/" ],
        _resolved: "https://registry.npmjs.org/alexa-sdk/-/alexa-sdk-1.0.25.tgz",
        _shasum: "bac389792aaba20bb7bd799eaf049ebff5bd8273",
        _spec: "alexa-sdk@^1.0.25",
        _where: "/Users/burggraa/Adobe/WSK/alexawebpack",
        author: {
            name: "Amazon.com"
        },
        bugs: {
            url: "https://github.com/alexa/alexa-skill-sdk-for-nodejs/issues"
        },
        bundleDependencies: false,
        contributors: [ {
            name: "Diego Benitez",
            email: "diegoben@amazon.com"
        }, {
            name: "Yang Zhang",
            email: "ygzg@amazon.com"
        }, {
            name: "Brendan Clement",
            email: "clebrend@amazon.com"
        }, {
            name: "Leandro Pascual",
            email: "leandrop@amazon.com"
        }, {
            name: "Krish Furia",
            email: "krishf@amazon.com"
        }, {
            name: "Tianren Zhang",
            email: "tianrenz@amazon.com"
        }, {
            name: "Tiantian Xie",
            email: "xtiantia@amazon.com"
        } ],
        dependencies: {
            "aws-sdk": "^2.4.7",
            i18next: "^3.4.1",
            "i18next-sprintf-postprocessor": "^0.2.2"
        },
        deprecated: false,
        description: "Alexa Skill SDK for Node.js",
        devDependencies: {
            chai: "^4.1.0",
            gulp: "^3.9.1",
            "gulp-jshint": "^2.0.4",
            "gulp-mocha": "^4.3.1",
            jshint: "^2.9.5",
            mocha: "^3.5.0",
            nock: "^9.0.25",
            sinon: "^4.0.2"
        },
        homepage: "https://github.com/alexa/alexa-skill-sdk-for-nodejs#readme",
        keywords: [ "Alexa", "skill", "sdk" ],
        license: "Apache-2.0",
        main: "index.js",
        name: "alexa-sdk",
        repository: {
            type: "git",
            url: "git+https://github.com/alexa/alexa-skill-sdk-for-nodejs.git"
        },
        scripts: {
            test: 'echo "Error: no test specified" && exit 1'
        },
        version: "1.0.25"
    };
}, function(module, exports, __webpack_require__) {
    "use strict";
    const createSSMLSpeechObject = message => {
        return {
            type: "SSML",
            ssml: `<speak> ${message} </speak>`
        };
    };
    const buildCard = (cardTitle, cardContent, cardImage) => {
        let card = {
            type: CARD_TYPES.SIMPLE,
            title: cardTitle,
            content: cardContent
        };
        if (cardImage && (cardImage.smallImageUrl || cardImage.largeImageUrl)) {
            card.type = CARD_TYPES.STANDARD;
            card.image = {};
            delete card.content;
            card.text = cardContent;
            if (cardImage.smallImageUrl) {
                card.image.smallImageUrl = cardImage.smallImageUrl;
            }
            if (cardImage.largeImageUrl) {
                card.image.largeImageUrl = cardImage.largeImageUrl;
            }
        }
        return card;
    };
    const CARD_TYPES = {
        STANDARD: "Standard",
        SIMPLE: "Simple",
        LINK_ACCOUNT: "LinkAccount",
        ASK_FOR_PERMISSIONS_CONSENT: "AskForPermissionsConsent"
    };
    const HINT_TYPES = {
        PLAIN_TEXT: "PlainText"
    };
    const DIRECTIVE_TYPES = {
        AUDIOPLAYER: {
            PLAY: "AudioPlayer.Play",
            STOP: "AudioPlayer.Stop",
            CLEAR_QUEUE: "AudioPlayer.ClearQueue"
        },
        DISPLAY: {
            RENDER_TEMPLATE: "Display.RenderTemplate"
        },
        HINT: "Hint",
        VIDEOAPP: {
            LAUNCH: "VideoApp.Launch"
        }
    };
    class ResponseBuilder {
        constructor(alexaHandler) {
            this._responseObject = alexaHandler.response;
            this._responseObject.version = "1.0";
            this._responseObject.response = {
                shouldEndSession: true
            };
            this._responseObject.sessionAttributes = alexaHandler._event.session.attributes;
        }
        speak(speechOutput) {
            this._responseObject.response.outputSpeech = createSSMLSpeechObject(speechOutput);
            return this;
        }
        listen(repromptSpeech) {
            this._responseObject.response.reprompt = {
                outputSpeech: createSSMLSpeechObject(repromptSpeech)
            };
            this._responseObject.response.shouldEndSession = false;
            return this;
        }
        cardRenderer(cardTitle, cardContent, cardImage) {
            const card = buildCard(cardTitle, cardContent, cardImage);
            this._responseObject.response.card = card;
            return this;
        }
        linkAccountCard() {
            this._responseObject.response.card = {
                type: CARD_TYPES.LINK_ACCOUNT
            };
            return this;
        }
        askForPermissionsConsentCard(permissions) {
            this._responseObject.response.card = {
                type: CARD_TYPES.ASK_FOR_PERMISSIONS_CONSENT,
                permissions: permissions
            };
            return this;
        }
        audioPlayer(directiveType, behavior, url, token, expectedPreviousToken, offsetInMilliseconds) {
            if (directiveType === "play") {
                return this.audioPlayerPlay(behavior, url, token, expectedPreviousToken, offsetInMilliseconds);
            } else if (directiveType === "stop") {
                return this.audioPlayerStop();
            } else {
                return this.audioPlayerClearQueue(behavior);
            }
        }
        audioPlayerPlay(behavior, url, token, expectedPreviousToken, offsetInMilliseconds) {
            const audioPlayerDirective = {
                type: DIRECTIVE_TYPES.AUDIOPLAYER.PLAY,
                playBehavior: behavior,
                audioItem: {
                    stream: {
                        url: url,
                        token: token,
                        expectedPreviousToken: expectedPreviousToken,
                        offsetInMilliseconds: offsetInMilliseconds
                    }
                }
            };
            this._addDirective(audioPlayerDirective);
            return this;
        }
        audioPlayerStop() {
            const audioPlayerDirective = {
                type: DIRECTIVE_TYPES.AUDIOPLAYER.STOP
            };
            this._addDirective(audioPlayerDirective);
            return this;
        }
        audioPlayerClearQueue(clearBehavior) {
            const audioPlayerDirective = {
                type: DIRECTIVE_TYPES.AUDIOPLAYER.CLEAR_QUEUE,
                clearBehavior: clearBehavior
            };
            this._addDirective(audioPlayerDirective);
            return this;
        }
        renderTemplate(template) {
            const templateDirective = {
                type: DIRECTIVE_TYPES.DISPLAY.RENDER_TEMPLATE,
                template: template
            };
            this._addDirective(templateDirective);
            return this;
        }
        hint(hintText, hintType) {
            if (!hintType) {
                hintType = HINT_TYPES.PLAIN_TEXT;
            }
            const hintDirective = {
                type: DIRECTIVE_TYPES.HINT,
                hint: {
                    type: hintType,
                    text: hintText
                }
            };
            this._addDirective(hintDirective);
            return this;
        }
        playVideo(source, metadata) {
            const playVideoDirective = {
                type: DIRECTIVE_TYPES.VIDEOAPP.LAUNCH,
                videoItem: {
                    source: source
                }
            };
            if (metadata) {
                playVideoDirective.videoItem.metadata = metadata;
            }
            delete this._responseObject.response.shouldEndSession;
            this._addDirective(playVideoDirective);
            return this;
        }
        shouldEndSession(val) {
            if (val === null) {
                delete this._responseObject.response.shouldEndSession;
            } else {
                this._responseObject.response.shouldEndSession = val;
            }
            return this;
        }
        _addDirective(directive) {
            if (!Array.isArray(this._responseObject.response.directives)) {
                this._responseObject.response.directives = [];
            }
            this._responseObject.response.directives.push(directive);
        }
    }
    module.exports.ResponseBuilder = ResponseBuilder;
    module.exports.CARD_TYPES = CARD_TYPES;
    module.exports.DIRECTIVE_TYPES = DIRECTIVE_TYPES;
    module.exports.HINT_TYPES = HINT_TYPES;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const skillEventHandlers = {
        "AlexaSkillEvent.SkillEnabled": function() {},
        "AlexaSkillEvent.SkillDisabled": function() {},
        "AlexaSkillEvent.SkillPermissionAccepted": function() {},
        "AlexaSkillEvent.SkillPermissionChanged": function() {},
        "AlexaSkillEvent.SkillAccountLinked": function() {}
    };
    module.exports.skillEventHandlers = skillEventHandlers;
}, function(module, exports, __webpack_require__) {
    "use strict";
    class EventParser {
        static parseEventName(event) {
            const requestType = event.request.type;
            if (requestType === "IntentRequest") {
                return event.request.intent.name;
            } else if (requestType.startsWith("Display.") || requestType.startsWith("AudioPlayer.") || requestType.startsWith("PlaybackController.")) {
                return requestType.split(".")[1];
            } else {
                return requestType;
            }
        }
    }
    module.exports.EventParser = EventParser;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    const TextUtils = __webpack_require__(2).TextUtils;
    class BodyTemplate1Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "BodyTemplate1";
        }
        setTextContent(primaryText, secondaryText, tertiaryText) {
            this.template.textContent = TextUtils.makeTextContent(primaryText, secondaryText, tertiaryText);
            return this;
        }
    }
    module.exports.BodyTemplate1Builder = BodyTemplate1Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    const TextUtils = __webpack_require__(2).TextUtils;
    class BodyTemplate2Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "BodyTemplate2";
        }
        setImage(image) {
            this.template.image = image;
            return this;
        }
        setTextContent(primaryText, secondaryText, tertiaryText) {
            this.template.textContent = TextUtils.makeTextContent(primaryText, secondaryText, tertiaryText);
            return this;
        }
    }
    module.exports.BodyTemplate2Builder = BodyTemplate2Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    const TextUtils = __webpack_require__(2).TextUtils;
    class BodyTemplate3Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "BodyTemplate3";
        }
        setImage(image) {
            this.template.image = image;
            return this;
        }
        setTextContent(primaryText, secondaryText, tertiaryText) {
            this.template.textContent = TextUtils.makeTextContent(primaryText, secondaryText, tertiaryText);
            return this;
        }
    }
    module.exports.BodyTemplate3Builder = BodyTemplate3Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    const TextUtils = __webpack_require__(2).TextUtils;
    class BodyTemplate6Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "BodyTemplate6";
        }
        setImage(image) {
            this.template.image = image;
            return this;
        }
        setTextContent(primaryText, secondaryText, tertiaryText) {
            this.template.textContent = TextUtils.makeTextContent(primaryText, secondaryText, tertiaryText);
            return this;
        }
    }
    module.exports.BodyTemplate6Builder = BodyTemplate6Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    class BodyTemplate7Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "BodyTemplate7";
        }
        setImage(image) {
            this.template.image = image;
            return this;
        }
    }
    module.exports.BodyTemplate7Builder = BodyTemplate7Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    class ListTemplate1Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "ListTemplate1";
        }
        setListItems(listItems) {
            this.template.listItems = listItems;
            return this;
        }
    }
    module.exports.ListTemplate1Builder = ListTemplate1Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TemplateBuilder = __webpack_require__(1).TemplateBuilder;
    class ListTemplate2Builder extends TemplateBuilder {
        constructor() {
            super();
            this.template.type = "ListTemplate2";
        }
        setListItems(listItems) {
            this.template.listItems = listItems;
            return this;
        }
    }
    module.exports.ListTemplate2Builder = ListTemplate2Builder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const TextUtils = __webpack_require__(2).TextUtils;
    class ListItemBuilder {
        constructor() {
            this.items = [];
        }
        addItem(image, token, primaryText, secondaryText, tertiaryText) {
            const item = {};
            item.image = image;
            item.token = token;
            item.textContent = TextUtils.makeTextContent(primaryText, secondaryText, tertiaryText);
            this.items.push(item);
            return this;
        }
        build() {
            return this.items;
        }
    }
    module.exports.ListItemBuilder = ListItemBuilder;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const ApiClient = __webpack_require__(5).ApiClient;
    const ServiceError = __webpack_require__(6).ServiceError;
    const DEVICE_ADDRESS_PATH_PREFIX = "/v1/devices/";
    const DEVICE_ADDRESS_PATH_POSTFIX = "/settings/address";
    const COUNTRY_AND_POSTAL_PATH_POSTFIX = "/countryAndPostalCode";
    class DeviceAddressService {
        constructor(apiClient) {
            this.apiClient = apiClient || new ApiClient();
        }
        getFullAddress(deviceId, apiEndpoint, token) {
            const uri = apiEndpoint + DEVICE_ADDRESS_PATH_PREFIX + deviceId + DEVICE_ADDRESS_PATH_POSTFIX;
            const headers = {
                Authorization: `Bearer ${token}`
            };
            return this.apiClient.get(uri, headers).then(this.__validateApiResponse);
        }
        getCountryAndPostalCode(deviceId, apiEndpoint, token) {
            const uri = apiEndpoint + DEVICE_ADDRESS_PATH_PREFIX + deviceId + DEVICE_ADDRESS_PATH_POSTFIX + COUNTRY_AND_POSTAL_PATH_POSTFIX;
            const headers = {
                Authorization: `Bearer ${token}`
            };
            return this.apiClient.get(uri, headers).then(this.__validateApiResponse);
        }
        __validateApiResponse(apiClientResponse) {
            let isResponseCodeValid = apiClientResponse.statusCode >= 200 && apiClientResponse.statusCode < 300;
            let responseBody;
            try {
                responseBody = apiClientResponse.body && JSON.parse(apiClientResponse.body);
            } catch (err) {
                responseBody = apiClientResponse.body;
            }
            if (isResponseCodeValid) {
                return responseBody;
            }
            throw new ServiceError(apiClientResponse.statusCode, JSON.stringify(responseBody));
        }
    }
    module.exports = DeviceAddressService;
}, function(module, exports) {
    module.exports = require("url");
}, function(module, exports, __webpack_require__) {
    "use strict";
    const ApiClient = __webpack_require__(5).ApiClient;
    const ServiceError = __webpack_require__(6).ServiceError;
    const LIST_MANAGEMENT_PATH = "/v2/householdlists/";
    class ListManagementService {
        constructor(apiClient) {
            this.apiClient = apiClient || new ApiClient();
            this.apiEndpoint = "https://api.amazonalexa.com";
        }
        setApiEndpoint(apiEndpoint) {
            this.apiEndpoint = apiEndpoint;
        }
        getApiEndpoint() {
            return this.apiEndpoint;
        }
        getListsMetadata(token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH;
            const headers = this.__buildHeaders(token);
            return this.apiClient.get(uri, headers).then(this.__validateApiResponse);
        }
        createList(listObject, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH;
            const headers = this.__buildHeaders(token, listObject);
            return this.apiClient.post(uri, headers, JSON.stringify(listObject)).then(this.__validateApiResponse);
        }
        getList(listId, itemStatus, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId + "/" + itemStatus;
            const headers = this.__buildHeaders(token);
            return this.apiClient.get(uri, headers).then(this.__validateApiResponse);
        }
        updateList(listId, listObject, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId;
            const headers = this.__buildHeaders(token, listObject);
            return this.apiClient.put(uri, headers, JSON.stringify(listObject)).then(this.__validateApiResponse);
        }
        deleteList(listId, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId;
            const headers = this.__buildHeaders(token);
            return this.apiClient.delete(uri, headers).then(this.__validateApiResponse);
        }
        createListItem(listId, listItemObject, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId + "/items";
            const headers = this.__buildHeaders(token, listItemObject);
            return this.apiClient.post(uri, headers, JSON.stringify(listItemObject)).then(this.__validateApiResponse);
        }
        getListItem(listId, itemId, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId + "/items/" + itemId;
            const headers = this.__buildHeaders(token);
            return this.apiClient.get(uri, headers).then(this.__validateApiResponse);
        }
        updateListItem(listId, itemId, listItemObject, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId + "/items/" + itemId;
            const headers = this.__buildHeaders(token, listItemObject);
            return this.apiClient.put(uri, headers, JSON.stringify(listItemObject)).then(this.__validateApiResponse);
        }
        deleteListItem(listId, itemId, token) {
            const uri = this.apiEndpoint + LIST_MANAGEMENT_PATH + listId + "/items/" + itemId;
            const headers = this.__buildHeaders(token);
            return this.apiClient.delete(uri, headers).then(this.__validateApiResponse);
        }
        __buildHeaders(token, body) {
            let headers = {
                Authorization: `Bearer ${token}`
            };
            if (body) {
                headers["Content-type"] = "application/json";
                headers["Content-length"] = Buffer.byteLength(JSON.stringify(body), "utf8");
            }
            return headers;
        }
        __validateApiResponse(apiClientResponse) {
            let isResponseCodeValid = apiClientResponse.statusCode >= 200 && apiClientResponse.statusCode < 300;
            let responseBody;
            try {
                responseBody = apiClientResponse.body && JSON.parse(apiClientResponse.body);
            } catch (err) {
                responseBody = apiClientResponse.body;
            }
            if (isResponseCodeValid) {
                return responseBody;
            }
            throw new ServiceError(apiClientResponse.statusCode, JSON.stringify(responseBody));
        }
    }
    module.exports = ListManagementService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    const ApiClient = __webpack_require__(5).ApiClient;
    const ServiceError = __webpack_require__(6).ServiceError;
    const DIRECTIVES_API_PATH = "/v1/directives";
    class DirectiveService {
        constructor(apiClient) {
            this.apiClient = apiClient || new ApiClient();
        }
        enqueue(directive, apiEndpoint, token) {
            const url = apiEndpoint + DIRECTIVES_API_PATH;
            return this.__dispatch(directive, url, token);
        }
        __dispatch(directive, url, token) {
            const body = JSON.stringify(directive);
            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            };
            return this.apiClient.post(url, headers, body).then(this.__validateApiResponse);
        }
        __validateApiResponse(apiClientResponse) {
            let isResponseCodeValid = apiClientResponse.statusCode >= 200 && apiClientResponse.statusCode < 300;
            if (isResponseCodeValid) {
                return;
            }
            throw new ServiceError(apiClientResponse.statusCode, JSON.stringify(apiClientResponse.body));
        }
    }
    module.exports = DirectiveService;
}, function(module, exports, __webpack_require__) {
    "use strict";
    class VoicePlayerSpeakDirective {
        constructor(requestId, speechContent) {
            this.header = {
                requestId: requestId
            };
            this.directive = {
                type: "VoicePlayer.Speak",
                speech: speechContent
            };
        }
    }
    module.exports = VoicePlayerSpeakDirective;
}, function(module, exports, __webpack_require__) {
    "use strict";
    class ImageUtils {
        static makeImage(url, widthPixels, heightPixels, size, description) {
            const imgObj = {
                url: url
            };
            if (widthPixels && heightPixels) {
                imgObj.widthPixels = widthPixels;
                imgObj.heightPixels = heightPixels;
            }
            if (size) {
                imgObj.size = size;
            }
            return ImageUtils.makeImages([ imgObj ], description);
        }
        static makeImages(imgArr, description) {
            let image = {};
            if (description) {
                image.contentDescription = description;
            }
            image.sources = imgArr;
            return image;
        }
    }
    module.exports.ImageUtils = ImageUtils;
} ]);