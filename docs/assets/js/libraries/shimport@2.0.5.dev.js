var __shimport__ = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }

    function get_alias(specifiers, name) {
        var i = specifiers.length;
        while (i--) {
            if (specifiers[i].name === name)
                return specifiers[i].as;
        }
    }
    function importDecl(str, start, end, specifiers, source) {
        var name = get_alias(specifiers, '*') || get_alias(specifiers, 'default');
        return {
            start: start,
            end: end,
            source: source,
            name: name,
            specifiers: specifiers,
            toString: function () {
                return "/*" + str.slice(start, end) + "*/";
            }
        };
    }
    function exportDefaultDeclaration(str, start, end) {
        var match = /^\s*(?:(class)(\s+extends|\s*{)|(function)\s*\()/.exec(str.slice(end));
        if (match) {
            // anonymous class declaration
            end += match[0].length;
            var name_1 = '__default_export';
            return {
                start: start,
                end: end,
                name: name_1,
                as: 'default',
                toString: function () {
                    return match[1]
                      ? "class " + name_1 + match[2]
                      : "function " + name_1 + "(";
                }
            };
        }
        return {
            start: start,
            end: end,
            toString: function () {
                return "__exports.default =";
            }
        };
    }
    function exportSpecifiersDeclaration(str, start, specifiersStart, specifiersEnd, end, source) {
        var specifiers = processSpecifiers(str.slice(specifiersStart + 1, specifiersEnd - 1).trim());
        return {
            start: start,
            end: end,
            source: source,
            toString: function (nameBySource) {
                var name = source && nameBySource.get(source);
                return specifiers
                  .map(function (s) {
                      return "__exports." + s.as + " = " + (name ? name + "." + s.name : s.name) + "; ";
                  })
                  .join('') + ("/*" + str.slice(start, end) + "*/");
            }
        };
    }
    function exportDecl(str, start, c) {
        var end = c;
        while (str[c] && /\S/.test(str[c]))
            c += 1;
        while (str[c] && !/\S/.test(str[c]))
            c += 1;
        var nameStart = c;
        while (str[c] && !punctuatorChars.test(str[c]) && !isWhitespace(str[c]))
            c += 1;
        var nameEnd = c;
        var name = str.slice(nameStart, nameEnd);
        return {
            start: start,
            end: end,
            name: name,
            toString: function () {
                return '';
            }
        };
    }
    function exportStarDeclaration(str, start, end, source) {
        return {
            start: start,
            end: end,
            source: source,
            toString: function (nameBySource) {
                return "Object.assign(__exports, " + nameBySource.get(source) + "); /*" + str.slice(start, end) + "*/";
            }
        };
    }
    var keywords = /\b(case|default|delete|do|else|in|instanceof|new|return|throw|typeof|void)\s*$/;
    var punctuators = /(^|\{|\(|\[\.|;|,|<|>|<=|>=|==|!=|===|!==|\+|-|\*\%|<<|>>|>>>|&|\||\^|!|~|&&|\|\||\?|:|=|\+=|-=|\*=|%=|<<=|>>=|>>>=|&=|\|=|\^=|\/=|\/)\s*$/;
    var ambiguous = /(\}|\)|\+\+|--)\s*$/;
    var punctuatorChars = /[{}()[.;,<>=+\-*%&|\^!~?:/]/;
    var keywordChars = /[a-zA-Z_$0-9]/;
    var whitespace_obj = { ' ': 1, '\t': 1, '\n': 1, '\r': 1, '\f': 1, '\v': 1, '\u00A0': 1, '\u2028': 1, '\u2029': 1 };
    function isWhitespace(char) {
        // this is faster than testing a regex
        return char in whitespace_obj;
    }
    function isQuote(char) {
        return char === "'" || char === '"';
    }
    var namespaceImport = /^\*\s+as\s+(\w+)$/;
    var defaultAndStarImport = /(\w+)\s*,\s*\*\s*as\s*(\w+)$/;
    var defaultAndNamedImport = /(\w+)\s*,\s*{(.+)}$/;
    function processImportSpecifiers(str) {
        var match = namespaceImport.exec(str);
        if (match) {
            return [{ name: '*', as: match[1] }];
        }
        match = defaultAndStarImport.exec(str);
        if (match) {
            return [{ name: 'default', as: match[1] }, { name: '*', as: match[2] }];
        }
        match = defaultAndNamedImport.exec(str);
        if (match) {
            return [{ name: 'default', as: match[1] }].concat(processSpecifiers(match[2].trim()));
        }
        if (str[0] === '{')
            return processSpecifiers(str.slice(1, -1).trim());
        if (str)
            return [{ name: 'default', as: str }];
        return [];
    }
    function processSpecifiers(str) {
        return str
          ? str.split(',').map(function (part) {
              var _a = part.trim().split(/[^\S]+/), name = _a[0], as = _a[2];
              return { name: name, as: as || name };
          })
          : [];
    }
    function getImportDeclaration(str, i) {
        var start = i;
        var specifierStart = i += 6;
        while (str[i] && isWhitespace(str[i]))
            i += 1;
        while (str[i] && !isQuote(str[i]))
            i += 1;
        var specifierEnd = i;
        var sourceStart = i += 1;
        while (str[i] && !isQuote(str[i]))
            i += 1;
        var sourceEnd = i++;
        return importDecl(str, start, i, processImportSpecifiers(str.slice(specifierStart, specifierEnd).replace(/from\s*$/, '').trim()), str.slice(sourceStart, sourceEnd));
    }
    function getImportStatement(i) {
        return {
            start: i,
            end: i + 6,
            toString: function () {
                return '__import';
            }
        };
    }
    var importMetaUrlPattern = /^import\s*\.\s*meta\s*\.\s*url/;
    function getImportMetaUrl(str, start, id) {
        var match = importMetaUrlPattern.exec(str.slice(start));
        if (match) {
            return {
                start: start,
                end: start + match[0].length,
                toString: function () {
                    return JSON.stringify('' + id);
                }
            };
        }
    }
    function getExportDeclaration(str, i) {
        var start = i;
        i += 6;
        while (str[i] && isWhitespace(str[i]))
            i += 1;
        var declarationStart = i;
        if (str[i] === '{') {
            while (str[i] !== '}')
                i += 1;
            i += 1;
            var specifiersEnd = i;
            var source = null;
            while (isWhitespace(str[i]))
                i += 1;
            if (/^from[\s\n'"]/.test(str.slice(i, i + 5))) {
                i += 4;
                while (isWhitespace(str[i]))
                    i += 1;
                while (str[i] && !isQuote(str[i]))
                    i += 1;
                var sourceStart = i += 1;
                while (str[i] && !isQuote(str[i]))
                    i += 1;
                source = str.slice(sourceStart, i);
                i += 1;
            }
            return exportSpecifiersDeclaration(str, start, declarationStart, specifiersEnd, i, source);
        }
        if (str[i] === '*') {
            i += 1;
            while (isWhitespace(str[i]))
                i += 1;
            i += 4;
            while (str[i] && !isQuote(str[i]))
                i += 1;
            var sourceStart = i += 1;
            while (str[i] && !isQuote(str[i]))
                i += 1;
            var sourceEnd = i++;
            return exportStarDeclaration(str, start, i, str.slice(sourceStart, sourceEnd));
        }
        if (/^default\b/.test(str.slice(i, i + 8))) {
            return exportDefaultDeclaration(str, start, declarationStart + 7);
        }
        return exportDecl(str, start, declarationStart);
    }
    function find(str, id) {
        var escapedFrom;
        var regexEnabled = true;
        var pfixOp = false;
        var stack = [];
        var lsci = -1; // last significant character index
        var lsc = function () { return str[lsci]; };
        var parenMatches = {};
        var openingParenPositions = {};
        var parenDepth = 0;
        var importDeclarations = [];
        var importStatements = [];
        var importMetaUrls = [];
        var exportDeclarations = [];
        function tokenClosesExpression() {
            if (lsc() === ')') {
                var c = parenMatches[lsci];
                while (isWhitespace(str[c - 1])) {
                    c -= 1;
                }
                // if parenthesized expression is immediately preceded by `if`/`while`, it's not closing an expression
                return !/(if|while)$/.test(str.slice(c - 5, c));
            }
            // TODO handle }, ++ and -- tokens immediately followed by / character
            return true;
        }
        var base = {
            pattern: /(?:(\()|(\))|({)|(})|(")|(')|(\/\/)|(\/\*)|(\/)|(`)|(import)|(export)|(\+\+|--))/g,
            handlers: [
                // (
                function (i) {
                    lsci = i;
                    openingParenPositions[parenDepth++] = i;
                },
                // )
                function (i) {
                    lsci = i;
                    parenMatches[i] = openingParenPositions[--parenDepth];
                },
                // {
                function (i) {
                    lsci = i;
                    stack.push(base);
                },
                // }
                function (i) {
                    lsci = i;
                    return stack.pop();
                },
                // "
                function (i) {
                    stack.push(base);
                    return double_quoted;
                },
                // '
                function (i) {
                    stack.push(base);
                    return single_quoted;
                },
                // //
                function (i) { return line_comment; },
                // /*
                function (i) { return block_comment; },
                // /
                function (i) {
                    // could be start of regex literal OR division punctuator. Solution via
                    // http://stackoverflow.com/questions/5519596/when-parsing-javascript-what-determines-the-meaning-of-a-slash/27120110#27120110
                    var b = i;
                    while (b > 0 && isWhitespace(str[b - 1])) {
                        b -= 1;
                    }
                    if (b > 0) {
                        var a = b;
                        if (punctuatorChars.test(str[a - 1])) {
                            while (a > 0 && punctuatorChars.test(str[a - 1])) {
                                a -= 1;
                            }
                        }
                        else {
                            while (a > 0 && keywordChars.test(str[a - 1])) {
                                a -= 1;
                            }
                        }
                        var token = str.slice(a, b);
                        regexEnabled = token
                          ? keywords.test(token) ||
                          punctuators.test(token) ||
                          (ambiguous.test(token) && !tokenClosesExpression())
                          : false;
                    }
                    else {
                        regexEnabled = true;
                    }
                    return slash;
                },
                // `
                function (i) { return template_string; },
                // import
                function (i) {
                    if (i === 0 || isWhitespace(str[i - 1]) || punctuatorChars.test(str[i - 1])) {
                        var j = i + 6;
                        var char = void 0;
                        do {
                            char = str[j++];
                        } while (isWhitespace(char));
                        var hasWhitespace = j > i + 7;
                        if (/^['"{*]$/.test(char) || (hasWhitespace && /^[a-zA-Z_$]$/.test(char))) {
                            var d = getImportDeclaration(str, i);
                            importDeclarations.push(d);
                            p = d.end;
                        }
                        else if (char === '(') {
                            var s = getImportStatement(i);
                            importStatements.push(s);
                            p = s.end;
                        }
                        else if (char === '.') {
                            var u = getImportMetaUrl(str, i, id);
                            if (u) {
                                importMetaUrls.push(u);
                                p = u.end;
                            }
                        }
                    }
                },
                // export
                function (i) {
                    if (i === 0 || isWhitespace(str[i - 1]) || punctuatorChars.test(str[i - 1])) {
                        if (/export[\s\n{]/.test(str.slice(i, i + 7))) {
                            var d = getExportDeclaration(str, i);
                            exportDeclarations.push(d);
                            p = d.end;
                        }
                    }
                },
                // ++/--
                function (i) {
                    pfixOp = (!pfixOp && str[i - 1] === '+');
                }
            ]
        };
        var slash = {
            pattern: /(?:(\[)|(\\)|(.))/g,
            handlers: [
                // [
                function (i) { return regexEnabled ? regex_character : base; },
                // \\
                function (i) { return ((escapedFrom = regex), escaped); },
                // anything else
                function (i) { return regexEnabled && !pfixOp ? regex : base; }
            ]
        };
        var regex = {
            pattern: /(?:(\[)|(\\)|(\/))/g,
            handlers: [
                // [
                function () { return regex_character; },
                // \\
                function () { return ((escapedFrom = regex), escaped); },
                // /
                function () { return base; }
            ]
        };
        var regex_character = {
            pattern: /(?:(\])|(\\))/g,
            handlers: [
                // ]
                function () { return regex; },
                // \\
                function () { return ((escapedFrom = regex_character), escaped); }
            ]
        };
        var double_quoted = {
            pattern: /(?:(\\)|("))/g,
            handlers: [
                // \\
                function () { return ((escapedFrom = double_quoted), escaped); },
                // "
                function () { return stack.pop(); }
            ]
        };
        var single_quoted = {
            pattern: /(?:(\\)|('))/g,
            handlers: [
                // \\
                function () { return ((escapedFrom = single_quoted), escaped); },
                // '
                function () { return stack.pop(); }
            ]
        };
        var escaped = {
            pattern: /(.)/g,
            handlers: [
                function () { return escapedFrom; }
            ]
        };
        var template_string = {
            pattern: /(?:(\${)|(\\)|(`))/g,
            handlers: [
                // ${
                function () {
                    stack.push(template_string);
                    return base;
                },
                // \\
                function () { return ((escapedFrom = template_string), escaped); },
                // `
                function () { return base; }
            ]
        };
        var line_comment = {
            pattern: /((?:\n|$))/g,
            handlers: [
                // \n
                function () { return base; }
            ]
        };
        var block_comment = {
            pattern: /(\*\/)/g,
            handlers: [
                // \n
                function () { return base; }
            ]
        };
        var state = base;
        var p = 0;
        while (p < str.length) {
            state.pattern.lastIndex = p;
            var match = state.pattern.exec(str);
            if (!match) {
                if (stack.length > 0 || state !== base) {
                    throw new Error("Unexpected end of file");
                }
                break;
            }
            p = match.index + match[0].length;
            for (var j = 1; j < match.length; j += 1) {
                if (match[j]) {
                    state = state.handlers[j - 1](match.index) || state;
                    break;
                }
            }
        }
        return [
            importDeclarations,
            importStatements,
            importMetaUrls,
            exportDeclarations
        ];
    }
    function transform(source, id) {
        var _a = find(source, id), importDeclarations = _a[0], importStatements = _a[1], importMetaUrls = _a[2], exportDeclarations = _a[3];
        var nameBySource = new Map();
        importDeclarations.forEach(function (d) {
            if (nameBySource.has(d.source))
                return;
            nameBySource.set(d.source, d.name || "__dep_" + nameBySource.size);
        });
        exportDeclarations.forEach(function (d) {
            if (!d.source)
                return;
            if (nameBySource.has(d.source))
                return;
            nameBySource.set(d.source, d.name || "__dep_" + nameBySource.size);
        });
        var keys = []
        var values = []
        nameBySource.forEach(function(value, key) {
            keys.push(key)
            values.push(value)
        });
        var deps = keys
          .map(function (s) { return "'" + s + "'"; })
          .join(', ');
        var names = ['__import', '__exports'].concat(values)
          .join(', ');
        var hoisted = [];
        importDeclarations.forEach(function (decl) {
            var name = nameBySource.get(decl.source);
            decl.specifiers
              .sort(function (a, b) {
                  if (a.name === 'default')
                      return 1;
                  if (b.name === 'default')
                      return -1;
              })
              .forEach(function (s) {
                  if (s.name !== '*') {
                      var assignment = (s.name === 'default' && s.as === name)
                        ? s.as + " = " + name + ".default; "
                        : "var " + s.as + " = " + name + "." + s.name + "; ";
                      hoisted.push(assignment);
                  }
              });
        });
        var transformed = "__shimport__.define('" + id + "', [" + deps + "], function(" + names + "){ " + hoisted.join('');
        var ranges = __spreadArrays(importDeclarations, importStatements, importMetaUrls, exportDeclarations).sort(function (a, b) { return a.start - b.start; });
        var c = 0;
        for (var i = 0; i < ranges.length; i += 1) {
            var range = ranges[i];
            transformed += (source.slice(c, range.start) +
              range.toString(nameBySource));
            c = range.end;
        }
        transformed += source.slice(c);
        exportDeclarations.forEach(function (d) {
            if (d.name)
                transformed += "\n__exports." + (d.as || d.name) + " = " + d.name + ";";
        });
        transformed += "\n});\n//# sourceURL=" + id;
        return transformed;
    }

    var promises = {};
    function define(id, deps, factory) {
        if (id.indexOf('blob:') === 0) {
            id = window.location.href
        }
        var __import = function (dep) { return load(new URL(dep, id)); };
        return Promise.all(deps.map(__import)).then(function (__deps) {
            var __exports = {};
            factory.apply(void 0, __spreadArrays([__import, __exports], __deps));
            return __exports;
        });
    }
    function load(url) {
        return promises[url] || (promises[url] = fetch(url)
          .then(function (r) { return r.text(); })
          .then(function (text) { return evaluate(transform(text, url)); }));
    }
    var uid = 1;
    function evaluate(code) {
        if (typeof document !== 'undefined' && typeof URL !== 'undefined') {
            return new Promise(function (fulfil) {
                var id = "__shimport__" + uid++;
                // creating a script tag gives us proper stack traces
                var blob = new Blob([id + "=" + code], {
                    type: 'application/javascript'
                });
                var script = document.createElement('script');
                script.src = URL.createObjectURL(blob);
                script.onload = function () {
                    fulfil(window[id]);
                    delete window[id];
                };
                document.head.appendChild(script);
            });
        }
        else {
            // for browsers without `URL`
            return (0, eval)(code);
        }
    }

    if (typeof document !== 'undefined') {
        var scr = document.querySelector('[data-main]');
        if (scr) {
            load(new URL(scr.getAttribute('data-main'), document.baseURI));
        }
    }
    var VERSION = "2.0.5";

    exports.VERSION = VERSION;
    exports.define = define;
    exports.load = load;
    exports.transform = transform;

    return exports;

}({}));
