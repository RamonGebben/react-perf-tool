import { ComponentClass } from 'react';

interface IPerf {
	start(): void;
    stop(): void;
    printWasted<TMeasurements>(measurements?: TMeasurements[]): void;
}

interface ReactPerfToolProps {
	perf: IPerf;
}

declare var ReactPerfTool : ComponentClass<ReactPerfToolProps>;

export = ReactPerfTool;