'use strict'
const chalk = require('chalk')
const semver = require('semver') // npm的语义化版本号工具
const shell = require('shelljs') // Unix Shell命令的js实现
const childProcess = require('child_process')
const packageConfig = require('../package.json')

function exec(cmd) {
  return childProcess.execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
    currentVersion: semver.clean(process.version),
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function() {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]

    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(
        mod.name
          + ': '
          + chalk.red(mod.currentVersion)
          + ' should be '
          + chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.group(chalk.yellow('To build correctly, upgrade the following modules:'))

    warnings.forEach((warning)=>{
      console.log(warning)
    })

    console.groupEnd()

    process.exit(1)
  }
}
