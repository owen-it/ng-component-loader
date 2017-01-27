var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var expect = require('chai').expect
var rimraf = require('rimraf')
var hash = require('hash-sum')
var extract = require('extract-text-webpack-plugin')

describe('ng-component-loader', function(){
    
    var outputDir = path.resolve(__dirname, '../')
    var loaderPath = 'exponse?ngLoader!' + path.resolve(__dirname, '../')
    var globalConfig = {
        output: {
            path: outputDir,
            filename: 'build-test.js'
        },
        module: {
            loaders: [
                {
                    test: /\.ng$/,
                    loader: loaderPath
                }
            ]
        }
    }

    function test(options, assert){
        
        var config = Object.assign({}, globalConfig, options)

        webpack(config, function(err, stats){
            
            if(stats.compilation.errors.length){
                stats.compilation.erros.forEach(function(err){
                    console.error(err.message)
                })
            }
            
        })
        
    }
    
    beforeEach(function(done){
        rmraf(outputDir, done)
    })
    
    it('extrat module', function(){
        
        test({
            entry: './test/stubs/component.ng'
        }, function(){
            
        })
        
    })
    
})
