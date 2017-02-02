var utils = require('loader-utils')
var path = require('path')
var parse = require('./parser')
var selector = require.resolve('./selector')

var rewrites = {
    template: require.resolve('./template-rewrite'),
    style: require.resolve('./style-rewrite')
}

module.exports = function(content) {

    var defaultLoaders = {
        html: '',
        css: 'css-loader',
        js: 'babel-loader?' + JSON.stringify({
            presents: ['es2015'],
            plugins: ['transform-runtime'],
            coments: false
        })
    }

    var defaultLang = {
        template: 'html',
        style: 'css',
        script: 'js'
    }

    this.cacheable();

    var context = this
    var query = utils.parseQuery(this.query)
    var options = Object.assign({}, this.options.ng, this.ng, query)
    var filePath = this.resourcePath
    var fileName = path.basename(filePath)
    var moduleId = '_ng-'

    if(this.options.babel) {
        defaultLoaders.js = 'babel-loader'
    }

    if(this.sourceMap && !this.minimize && 
        options.cssSourceMao != false && process.env.NODE_ENV !== 'production') 
    {
        defaultLoaders.css = 'css-loader?sourceMap'
    }

    var loaders = Object.assign({}, defaultLoaders, options.loaders)

    var parts = parse(content, fileName, this.sourceMap)
    var hasLocalStyle = false
    var output = [
        'var __comp_script__;',
        'var __comp_template__;',
        'var __comp_styles__ = {};'
    ].join('')

    function getRewrite(type, scoped)
    {
        var meta = '?id=' + moduleId
        switch (type) {
            case 'template':
                return scoped ? `${rewrites.template}${meta}!` : ''
            case 'style':
                return rewrites.style + (scoped ? `${meta}&scoped=true` : '!')
            default:
                return ''
        }
    }

    function getLoaderString(type, part, index, scoped)
    {
        var lang = part.lang || defaultLang[type]
        var loader = loaders[lang]
        var rewrite = getRewrite(type, scoped)

        dd(type, part, index, scoped)
    }

    function getRequireForImportString(type, req, scoped)
    {
        return utils.stringifyRequest(
            context, `!!${getLoaderString(type, req, -1, scoped)}${req.src}`
        )
    }

    function getRequireForImport(type, req, scoped)
    {
        return `require(${getRequireForImportString(type, req, scoped)})`
    }

    var cssModules = {}
    function setCssModule(style, require)
    {
        if(!style.module) return require
        if(style.module in cssModules) {
            context.emitError(`CSS module name ${style.module} is not unique!`)
            return require
        }

        cssModules[style.module] = true
        return `__comp_styles__["${style.module}"] = require;`
    }

    function getRequire(type, part, index, scoped)
    {
        return `require(${getRequireString(type, part, index, scoped)})`
    }

    function getSelectorString(type, index){
        return `${selector}?type=${type}&index=${index}!` 
    }

    function getRequireString(type, part, index, scoped)
    {
        return utils.stringifyRequest(context, [
            '!!', getLoaderString(type, part, index, scoped),
            getSelectorString(type, index || 0),
            utils.getRemainingRequest(context)
        ])
    }

    parts.styleImports.forEach(function(part){
        if(part.scoped) hasLocalStyle = true
        if(part.module === '') part.module = '$style'

        var requireString = getRequireForImport(
            'style', part, part.scoped
        )

        output += setCssModule(part, requireString)
    })

    parts.style.forEach(function(style, i){
        if(style.scoped) hasLocalStyle = true
        if(style.module === '') style.module = '$style'

        var requireString = getRequire(
            'style', style, i, style.scoped, style.module
        )
    })


};










































var i = 0;
function dd(...args){
    console.log(`---------------------${++i}-------------------------\n\n`)
    args.forEach((log, i) => {
        console.log(`${i}: `, log)
    })
    console.log('\n\n-----------------------------------------------\n\n')    
}
function dt(title, ...args){
    console.log(`\n\n-----------------------------------------------`)
    console.log(`                   ${title}`)
    dd(...args);
}


  // this.cacheable && this.cacheable();

  // var callback = this.async();
  // var opt = utils.parseQuery(this.query);

  // function exportContent(content) {
  //   if (opt.raw) {
  //     callback(null, content);
  //   } else {
  //     callback(null, "module.exports = " + JSON.stringify(content));
  //   }
  // }

  // if(!opt.engine) {
  //   opt.engine = extname(this.request).substr(1).toLowerCase();
  // }

  // if(!consolidate[opt.engine]) {
  //   throw new Error("Engine '"+ opt.engine +"' isn't available in Consolidate.js");
  // }

  // opt.filename = this.resourcePath;

  // consolidate[opt.engine].render(content, opt, function(err, html) {
  //   if(err) {
  //     throw err;
  //   }
  //   exportContent(html);
  // });