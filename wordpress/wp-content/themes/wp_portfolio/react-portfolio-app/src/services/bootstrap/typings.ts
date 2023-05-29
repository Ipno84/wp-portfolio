interface Initializer {
  selector?: string;
  main: (() => JSX.Element | null) | React.FC<{}>;
}

interface IBootstrapClass {
  init: ({ selector, main }: Initializer) => void;
  canReportWebVitals: boolean;
}

export type { IBootstrapClass, Initializer };
