import type { Metric } from "web-vitals/dist/modules/types";
import ReactDOM from "react-dom/client";
import { StrictMode, FC } from "react";
import { Env } from "~/services/env";
import type {
  IBootstrapClass,
  Initializer,
} from "~/services/bootstrap/typings";

class BootstrapClass implements IBootstrapClass {
  private static _instance: BootstrapClass;
  private selector: string = "#root";
  private main: (() => JSX.Element | null) | FC<{}> = () => null;
  private _canRepoderWebVitals: boolean = Env.checkVar(
    "REACT_APP_REPORT_WEBVITALS",
    true
  );

  public static get instance(): BootstrapClass {
    if (!this._instance) this._instance = new BootstrapClass();
    return this._instance;
  }

  public get canReportWebVitals(): boolean {
    return this._canRepoderWebVitals;
  }

  public init({ selector, main }: Initializer) {
    if (selector) this.selector = selector;
    this.main = main;

    this.reportWebVitals();
    this.initReactApp();
  }

  private async initReactApp() {
    const rootElement = document.querySelector(this.selector);

    if (rootElement) {
      const root = ReactDOM.createRoot(rootElement);

      root.render(
        <StrictMode>
          <this.main />
        </StrictMode>
      );
    }
  }

  private async reportWebVitals(): Promise<void> {
    if (this.canReportWebVitals) {
      const reportWebVitals = await import("~/reportWebVitals");
      reportWebVitals.default((metric: Metric) => console.log(metric));
    }
  }
}

const Bootstrap = BootstrapClass.instance;

export { Bootstrap };
