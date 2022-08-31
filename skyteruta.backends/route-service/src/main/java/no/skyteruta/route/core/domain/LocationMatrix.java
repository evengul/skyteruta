package no.skyteruta.route.core.domain;

import java.util.Arrays;

public record LocationMatrix(LocationMatrixElement[][] elements) {

    public static LocationMatrix newInstance(int size) {
        return new LocationMatrix(new LocationMatrixElement[size][size]);
    }

    public LocationMatrixElement[] get(String id) {
        return Arrays.stream(this.elements)
                .filter(list -> Arrays.stream(list).anyMatch(element -> element.from().equals(id)))
                .findFirst()
                .orElseThrow();
    }

    public void set(int x, int y, LocationMatrixElement element) {
        this.elements[x][y] = element;
    }

    public int size() {
        return this.elements.length;
    }
}
