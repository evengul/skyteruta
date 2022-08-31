package no.skyteruta.route.infrastructure.gateway;

import com.traveltime.sdk.TravelTimeSDK;
import com.traveltime.sdk.auth.TravelTimeCredentials;
import com.traveltime.sdk.dto.common.Location;
import com.traveltime.sdk.dto.common.Property;
import com.traveltime.sdk.dto.common.transportation.Driving;
import com.traveltime.sdk.dto.requests.TimeFilterRequest;
import com.traveltime.sdk.dto.requests.timefilter.DepartureSearch;
import com.traveltime.sdk.dto.responses.TimeFilterResponse;
import com.traveltime.sdk.dto.responses.errors.TravelTimeError;
import io.vavr.control.Either;
import no.skyteruta.route.core.domain.LocationMatrix;
import no.skyteruta.route.core.usecases.route.MatrixGateway;

import java.time.Instant;
import java.util.List;

public class MatrixGatewayImpl implements MatrixGateway {
    @Override
    public LocationMatrix getLocationMatrix(List<Location> locations, Location startLocation) {
        LocationMatrix locationMatrix = LocationMatrix.newInstance(locations.size());

        TimeFilterResponse response = search(startLocation, locations);

        return LocationMatrix.newInstance(0);
    }

    private TimeFilterResponse search(Location from, List<Location> to) {
        TravelTimeSDK sdk = new TravelTimeSDK(new TravelTimeCredentials("6460e4ba", "1683d908ce5ef9aa2b67482b82807441"));

        List<String> toIds = to
                .stream()
                .map(Location::getId)
                .toList();

        List<DepartureSearch> departureSearches = List.of(
                DepartureSearch
                        .builder()
                        .id("Skyteruta departure search")
                        .departureLocationId(from.getId())
                        .arrivalLocationIds(toIds)
                        .departureTime(Instant.now())
                        .travelTime(14400)
                        .transportation(Driving.builder().build())
                        .properties(List.of(Property.TRAVEL_TIME, Property.DISTANCE))
                        .build()
        );

        TimeFilterRequest request = TimeFilterRequest
                .builder()
                .locations(to)
                .departureSearches(departureSearches)
                .build();
        Either<TravelTimeError, TimeFilterResponse> response = sdk.send(request);

        if(response.isRight()) {
            return response.get();
        } else {
            throw new RuntimeException("Could not get travel times");
        }
    }


}
