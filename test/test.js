var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var expect = require('chai').expect
var rimraf = require('rimraf')
var hash = require('hash-sum')
var extract = require('extract-text-webpack-plugin')

describe('ng-component-loader', function(){
    
    var testHTML = '<!DOCTYPE html><html><head></head><body></body></html>'
    var outputDir = path.resolve(__dirname, './output')
    var loaderPath = 'expose-loader?ngComponent!' + path.resolve(__dirname, '../index.js')
    var globalConfig = {
        output: {
            path: outputDir,
            filename: 'build-test.js'
        },
        module: {
            rules: [
                {
                    test: /\.ng$/,
                    loader: loaderPath
                },
                {
                    test: /\.ng$/,
                    loader: 'style-loader'
                }
            ]
        }
    }

    function getFile(file, callback){
        fs.readFile(path.resolve(outputDir, file), 'utf-8', function (err, data){
            expect(err).to.not.exist
            callback(data)
        })
    }

    function test(options, assert){
        
        var opt = Object.assign({}, globalConfig, options)

        var w = webpack(opt)

        w.run(function(err, stats){
            
            console.log(stats)


            if(stats.compilation.errors.length){
                stats.compilation.erros.forEach(function(err){
                    console.error(err.message)
                })
            }

            expect(stats.compilation.erros.length).to.be.empty

            getFile('build-test.js', function(data){
                jsdom.env({
                    html: testHtml, 
                    src: [data],
                    done: function (err, window){
                        if(err){
                            console.log(err[0].data.error.stack)

                            expect(err).to.be.null
                        }

                        assert(window)
                    }
                })
            })
            
        })
        
    }
    
    beforeEach(function(done){
        rimraf(outputDir, done)
    })

    it('run webpack base', function (done){

        const w = webpack({
            entry: path.resolve(__dirname, './entry.js'),
            output: {
                filename: 'build.js',
                path: __dirname
            },
            module: {
                rules: [
                    {
                         test: /\.ng$/,
                         loader: loaderPath
                    }
                ]
            }
        });

        w.run(function(err, stats){

            expect(err).to.be.null

            if (stats.compilation.errors.length) {
                stats.compilation.errors.forEach(function (err) {
                    console.error(err.message)
                })
            }

            expect(stats.compilation.errors.length).to.be.empty

        })

        // Important! Verify loader progress init
        //done()

    })
    
    it('extrat component angularjs', function(done){

        var bundle = webpack({

            entry: './../my-component.js',
            output: {
                filename: 'output-test.js',
                path: '/'
            },
            module: {
                rules: [
                    {
                        test: /\.ng$/,
                        loader: 'file-loader'
                    }
                ]
            }

        })

        bundle.run(function(){
            console.log(arguments)
        })

        test({
            entry: path.resolve(__dirname, '../my-component.js')
            // entry: path.resolve(__dirname, './stubs/component.ng')
        }, function(window){

            var component = window.ngComponent

            expect(component.template).to.contain('<h1>{{ title }}<h1>')

        })
        
        done()
    })
    
})
