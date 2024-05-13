import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export class DepNodeProvider implements vscode.TreeDataProvider<Dependency> {
  constructor(private workspaceRoot: string | undefined) {}
  getTreeItem(element: Dependency): vscode.TreeItem {
    return element;
  }
  getChildren(element?: Dependency): Thenable<Dependency[]> {
    if (!this.workspaceRoot) {
      vscode.window.showInformationMessage("这是一个空的工作区!");
      return Promise.resolve([]);
    }
    if (!element) {
      const packageJsonPath = path.join(this.workspaceRoot, "package.json");
      if (this.pathExists(packageJsonPath)) {
        return Promise.resolve(this.getDepsInPackageJson(packageJsonPath));
      } else {
        return Promise.resolve([]);
      }
    } else {
      return Promise.resolve(
        this.getDepsInPackageJson(
          path.join(
            this.workspaceRoot,
            "node_modules",
            element.label,
            "package.json"
          )
        )
      );
    }
  }
  private pathExists(p: string): boolean {
    try {
      fs.accessSync(p);
    } catch (err) {
      return false;
    }

    return true;
  }
  private getDepsInPackageJson(packageJsonPath: string): Dependency[] {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
    const workspaceRoot = this.workspaceRoot;
    const toDep = (moduleName: string, version: string): Dependency => {
      if (
        this.pathExists(
          path.join(workspaceRoot as string, "node_modules", moduleName)
        )
      ) {
        return new Dependency(
          moduleName,
          version,
          vscode.TreeItemCollapsibleState.Collapsed
        );
      } else {
        return new Dependency(
          moduleName,
          version,
          vscode.TreeItemCollapsibleState.None
        );
      }
    };
    const deps = Object.keys(packageJson.dependencies).map((moduleName) => {
      return toDep(moduleName, packageJson.dependencies[moduleName]);
    });
    const devDeps = Object.keys(packageJson.devDependencies).map(
      (moduleName) => {
        return toDep(moduleName, packageJson.devDependencies[moduleName]);
      }
    );
    return deps.concat(devDeps);
  }
}
export class Dependency extends vscode.TreeItem {
  constructor(
    public readonly label: string,
    private readonly version: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState // public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState);

    this.tooltip = `${this.label}-${this.version}`;
    this.description = this.version;
  }

  //   iconPath = {
  //     light: path.join(
  //       __filename,
  //       "..",
  //       "..",
  //       "resources",
  //       "light",
  //       "dependency.svg"
  //     ),
  //     dark: path.join(
  //       __filename,
  //       "..",
  //       "..",
  //       "resources",
  //       "dark",
  //       "dependency.svg"
  //     ),
  //   };

  contextValue = "dependency";
}
