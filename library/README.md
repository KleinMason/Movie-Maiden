# Typescript Library
*This project was scaffolded using Shaman CLI*

This typescript library is intended to store shared code, and could be installed in other projects, or built and published to an npm repository. 

## Building the Project

If you scaffolded this project as part of a ["solution"](https://www.npmjs.com/package/shaman-cli#scaffold-solution-command) then you can use Shaman CLI to build this project. Open a command line interface (CMD, bash, etc.) and navigate to your solution folder (where your shaman.json file is located), and run the following command:

```sh
shaman build node
```

If you scaffolded this project [manually](https://www.npmjs.com/package/shaman-cli#scaffold-command) then you can use the npm command to build the project. Open a command line interface (CMD, bash, etc.) and navigate to the library project folder, then run the following command:

```sh
npm run build
```

## Installing in Other Projects

To install this library project in another typescript project, first build the project. Once the project has been built, open the package.json file for the other project (the one that will be *dependent* on this library project). Now add a property to the "dependency" property that follows the below pattern (note: you may need to create the "dependency" property, if you don't yet have any dependencies):

```json
{
    ...
    "dependencies": {
        "sample-library": "file:../library"
    }
    ...
}
```

The name of the dependency property should reflect the value in the library project's package.json "name" property. The value of the dependency property should be a relative (or absolute) path to the library project's folder.

## Publish to NPM Repository

To publish this library to the NPM repository, first build the project. Once the project has been built, open the project's package.json file and change the "private" property to false (or remove it). You will also want to change the "name" property in your package.json, since this value must be unique accross all npm packages. Finally, open a command line interface (CMD, bash, etc.) and navigate to the library project folder, then run the following command:

```sh
npm publish
```

*Note: for the publish command to work, you must have an npm account, and be logged in using the npm CLI.