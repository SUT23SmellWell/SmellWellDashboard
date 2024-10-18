import type { RegisteredComponent } from "@builder.io/sdk-angular";
import { AppComponent } from "./app.component";
import { Counter } from "./components/counter.component";
import { FigmaImportsPage } from "./components/figma-imports.component";
import { SalesOverviewComponent } from "./components/SalesOverview/sales-overview/sales-overview.component";

export const CUSTOM_COMPONENTS: RegisteredComponent[] = [
  {
    component: AppComponent,
    name: "AppComponent",
  },
  {
    component: Counter,
    name: "Counter",
    inputs: [
      {
        name: "initialCount",
        type: "number",
      },
    ],
  },
  {
    component: FigmaImportsPage,
    name: "FigmaImportsPage",
  },
  {
    component: SalesOverviewComponent,
    name: "SalesOverviewComponent",
  },
];
