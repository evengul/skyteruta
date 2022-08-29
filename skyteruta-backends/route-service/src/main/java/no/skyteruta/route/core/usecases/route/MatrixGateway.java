package no.skyteruta.route.core.usecases.route;

import com.traveltime.sdk.dto.common.Location;
import no.skyteruta.route.core.domain.LocationMatrix;

import java.util.List;

public interface MatrixGateway {
    LocationMatrix getLocationMatrix(List<Location> locations, Location startLocation);
}
