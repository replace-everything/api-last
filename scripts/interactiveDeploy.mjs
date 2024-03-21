import { execSync } from 'child_process';
import fs from 'fs/promises';
import path from 'path';

async function runDeployment() {
  // Dynamic import for ES modules
  const chalk = (await import('chalk')).default;
  const emoji = await import('node-emoji');
  const inquirer = await import('inquirer');

  console.log(
    chalk.yellow('Starting Deployment Process ' + emoji.get('rocket')),
  );

  // Step 1: Choose package manager
  const { packageManager } = await inquirer.prompt([
    {
      type: 'list',
      name: 'packageManager',
      message: 'Choose your package manager:',
      choices: ['npm', 'yarn'],
    },
  ]);

  // Update package manager in newPackageJson
  const newPackageJsonPath = path.join(
    __dirname,
    '..',
    'layer',
    'nodejs',
    'package.json',
  );
  const newPackageJson = JSON.parse(
    fs.readFileSync(newPackageJsonPath, 'utf8'),
  );
  newPackageJson.packageManager =
    packageManager === 'yarn' ? 'yarn@1.22.1' : 'npm';
  fs.writeFileSync(newPackageJsonPath, JSON.stringify(newPackageJson, null, 2));
  console.log(
    chalk.green(
      `Package manager set to ${newPackageJson.packageManager} ` +
        emoji.get('ok_hand'),
    ),
  );

  // Step 2: Confirm steps
  const steps = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'rollup',
      message: `${emoji.get(
        'package',
      )} Perform Rollup bundling & minification?`,
    },
    {
      type: 'confirm',
      name: 'buildLayer',
      message: `${emoji.get('cloud')} Build a new layer for AWS Lambda?`,
    },
    {
      type: 'confirm',
      name: 'deployLayer',
      message: `${emoji.get('rocket')} Deploy the new Layer?`,
    },
    {
      type: 'confirm',
      name: 'deployProject',
      message: `${emoji.get(
        'checkered_flag',
      )} Deploy project with updated serverless.yml?`,
    },
  ]);

  // Execute steps based on confirmation
  if (steps.rollup) {
    console.log(chalk.blue('🚀 Running Rollup bundling & minification...'));
    execSync('yarn bundle', { stdio: 'inherit' });
  }

  if (steps.buildLayer) {
    console.log(chalk.blue('📦 Building new AWS Lambda layer...'));
    execSync('yarn prepare:layer', { stdio: 'inherit' });
    execSync('yarn package', { stdio: 'inherit' });
  }

  if (steps.deployLayer) {
    console.log(chalk.blue('🌐 Deploying new AWS Lambda layer...'));
    execSync('yarn deploy:layer', { stdio: 'inherit' });
  }

  if (steps.deployProject) {
    console.log(chalk.blue('🚀 Deploying project and serverless.yml...'));
    execSync('yarn deploy:serverless', { stdio: 'inherit' });
  }

  console.log(
    chalk.green('✨ Deployment process completed! ' + emoji.get('sparkles')),
  );
}

runDeployment().catch((error) => {
  console.error(`Deployment process failed: ${error}`);
  process.exit(1);
});
