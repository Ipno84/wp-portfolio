interface IEnvClass {
  vars: NodeJS.ProcessEnv;
  getVar: <T = any>(key: string, parse?: boolean) => T;
  parseVar: <T = any>(envVar: string, key?: string) => boolean | T;
  checkVar: <T = any>(key: string, comparator: T) => boolean;
}

export type { IEnvClass };
