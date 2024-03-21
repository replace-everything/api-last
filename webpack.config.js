const path = require('path');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (_, context) => {
  const isProductionMode = context.mode !== 'development';

  const plugins = [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'node_modules/swagger-ui-dist',
          to: 'swagger-ui',
        },
        {
          from: 'src/clients/clients.module.ts',
          to: 'modules/clients.modules.ts',
        },
        {
          from: 'src/users/users.module.ts',
          to: 'modules/users.modules.ts',
        },
        {
          from: 'src/tasks/tasks.controller.ts',
          to: 'modules/tasks.controller.ts',
        },
        {
          from: 'src/photos/photos.module.ts',
          to: 'modules/photos.modules.ts',
        },
        {
          from: 'src/leads/leads.module.ts',
          to: 'modules/leads.modules.ts',
        },
        {
          from: 'src/lead-photos/lead-photos.module.ts',
          to: 'modules/lead-photos.modules.ts',
        },
        {
          from: 'src/invoices/invoices.module.ts',
          to: 'modules/invoices.modules.ts',
        },
        {
          from: 'src/events/events.module.ts',
          to: 'modules/events.modules.ts',
        },
        {
          from: 'src/contingencies/contingencies.module.ts',
          to: 'modules/contingencies.modules.ts',
        },
        {
          from: 'src/companies/companies.module.ts',
          to: 'modules/companies.modules.ts',
        },
        {
          from: 'src/clients/clients.module.ts',
          to: 'modules/clients.modules.ts',
        },
        {
          from: 'src/buildings/buildings.module.ts',
          to: 'modules/buildings.modules.ts',
        },
      ],
    }),
  ];
  if (!isProductionMode) {
    plugins.push(
      new Dotenv({
        path: '.env',
        systemvars: true,
      }),
    );
  }
  const entry =
    process.env.entry === 'photo-uploader'
      ? {
          photoUploader: './src/photo-uploader.ts',
        }
      : {
          photoUploader: './src/photo-uploader.ts',
          bundle: './src/main.ts',
          'package.json': './package.json',
        };

  return {
    entry,
    target: 'node18',
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        formidable: false, // Ensure this alias is still relevant
        'class-transformer/storage': require.resolve(
          'class-transformer/cjs/storage',
        ),
        'class-transformer': require.resolve('class-transformer'),
      },
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          type: 'asset/source',
        },
        {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              onlyCompileBundledFiles: true,
              transpileOnly: true,
            },
          },
          include: path.resolve(__dirname, 'src'),
          exclude: [/node_modules/, /\.d\.ts$/, /\.spec\.ts$/],
        },
      ],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
      clean: true,
    },
    optimization: {
      minimize: isProductionMode,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false,
            compress: isProductionMode,
            sourceMap: false,
          },
          extractComments: false,
        }),
      ],
    },
    plugins,
    cache: {
      type: 'filesystem',
      buildDependencies: {
        config: [__filename],
      },
    },
    devtool: isProductionMode ? false : 'source-map', // Enable source maps in development for easier debugging
    stats: 'errors-only',
  };
};
