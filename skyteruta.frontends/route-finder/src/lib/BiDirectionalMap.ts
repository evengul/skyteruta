type DoubleNumberMap<V> = Record<number, Record<number, V>>;

export class BiDirectionalMap<V extends object> {
	private oneWay: DoubleNumberMap<V>;
	private otherWay: DoubleNumberMap<V>;

	constructor() {
		this.oneWay = {} as DoubleNumberMap<V>;
		this.otherWay = {} as DoubleNumberMap<V>;
	}

	put(k1: number, k2: number, v: V) {
		if (this.oneWay[k1]) {
			this.oneWay[k1][k2] = v;
		} else {
			this.oneWay[k1] = { [k2]: v } as Record<number, V>;
		}
		if (this.otherWay[k2]) {
			this.otherWay[k2][k1] = v;
		} else {
			this.otherWay[k2] = { [k2]: v } as Record<number, V>;
		}
	}

	get(k1: number, k2: number): V | null {
		if (this.oneWay[k1]) {
			return this.oneWay[k1][k2] ?? null;
		} else if (this.otherWay[k2]) {
			return this.oneWay[k2][k1] ?? null;
		}
		return null;
	}

	getClean() {
		Object.keys(this.oneWay)
			.map((key) => key as unknown as number)
			.forEach((key: number) =>
				Object.keys(this.oneWay[key])
					.map((innerKey) => innerKey as unknown as number)
					.forEach((innerKey) => {
						if (key === innerKey) {
							delete this.oneWay[key][innerKey];
						}
					})
			);
		return this.oneWay;
	}
}
