import type { IEnvClass } from "~/services/env/typings";

class EnvClass implements IEnvClass {
  private static _instance: EnvClass;

  private _vars: NodeJS.ProcessEnv = process.env;

  public static get instance(): EnvClass {
    if (!this._instance) this._instance = new EnvClass();
    return this._instance;
  }

  public get vars(): NodeJS.ProcessEnv {
    return this._vars;
  }

  public set vars(vars: NodeJS.ProcessEnv) {
    this._vars = vars;
  }

  private isBoolean(item: string) {
    return item === "true" || item === "false";
  }

  private isUndefined(item: string) {
    return typeof item === "undefined" || item === "undefined";
  }

  private isNull(item: string) {
    return (typeof item === "object" && !item) || item === "null";
  }

  private isNumber(item: unknown) {
    return !isNaN(Number(item));
  }

  public getVar<T = any>(key: string, parse?: boolean): T {
    let envVar = this.vars[key] as T;

    if (parse && envVar) {
      return this.parseVar<T>(envVar as string, key) as T;
    }

    return envVar as T;
  }

  public parseVar<T = any>(envVar: string, key?: string) {
    const isBoolean = this.isBoolean(envVar);
    if (isBoolean) return envVar === ("true" as T);

    const isUndefined = this.isUndefined(envVar);
    if (isUndefined) return undefined as T;

    const isNull = this.isNull(envVar);
    if (isNull) return null as T;

    const isNumber = this.isNumber(envVar);
    if (isNumber) return Number(envVar) as T;

    try {
      return JSON.parse(envVar) as T;
    } catch (error) {
      if (key) {
        console.warn(`Failed to parse process.env.${key}`);
      }
    }
    return envVar as T;
  }

  public checkVar<T = any>(key: string, comparator: T): boolean {
    const envVar = this.getVar(key, true);
    return envVar === comparator;
  }
}

const Env = EnvClass.instance;

export { Env };
