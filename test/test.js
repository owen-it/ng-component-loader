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
        
        var config = Object.assign({}, globalConfig, options)

        webpack(config).run(function(err, stats){
            
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
    
    it('extrat component angularjs', function(done){

        test({
            entry: './test/stubs/component.ng'
        }, function(window){

            var component = window.ngComponent

            expect(component.template).to.contain('<h1>{{ title }}<h1>')

        })
        
        done()
    })
    
})
