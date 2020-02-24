const HtmlWebpackPlugin = require("html-webpack-plugin")
const webpack = require ('webpack')
 
module.exports = env =>{

        return {
        output: {
                filename: 'app.bundle.js',
                publicPath: '/'
        },
        plugins: [
                new HtmlWebpackPlugin({
                    template:'public/index.html'
                })
                ,new webpack.EnvironmentPlugin({
                        API_WEATHER_FORECAST:"https://api.openweathermap.org/data/2.5/forecast?id=7874740&appid=6ac9d35cb14c8b698da1245e9479b095&lang=es&units=metric",
                        API_WEATHER_TODAY:"https://api.openweathermap.org/data/2.5/weather?id=7874740&appid=6ac9d35cb14c8b698da1245e9479b095&lang=es&units=metric",
                        ICON_PATH:"http://openweathermap.org/img/w/",
                })
                
        ],
        devServer: {
                historyApiFallback: true
        },
        module: {
            rules: [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                                loader: 'babel-loader',
                                options: {
                                        presets: [
                                                '@babel/preset-env',
                                                '@babel/preset-react'
                                        ]
                                    }
                            }
                    },
                    {
                        test: /\.css$/i,
                        use: ['style-loader', 'css-loader'],
                    }
            ]
        }
        };
}