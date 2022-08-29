package no.skyteruta.route.presentation.mappers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.cloud.functions.HttpRequest;
import com.traveltime.sdk.dto.common.Coordinates;
import com.traveltime.sdk.dto.common.Location;
import lombok.experimental.UtilityClass;
import no.skyteruta.route.core.usecases.route.FindBestRouteUseCase;
import no.skyteruta.route.presentation.entities.InputRequest;

import java.io.IOException;
import java.util.List;

@UtilityClass
public class InputMapper {
    public static FindBestRouteUseCase.InputValues map(HttpRequest request) {
        try {
            InputRequest inputRequest = new ObjectMapper().readValue(request.getInputStream().readAllBytes(), InputRequest.class);
            List<Location> locations = inputRequest.locations()
                    .stream()
                    .map(location -> new Location(location.tempId(), new Coordinates(location.latitude(), location.longitude())))
                    .toList();
            return new FindBestRouteUseCase.InputValues(inputRequest.startPoint(), locations);
        } catch (IOException e) {
            throw new RuntimeException("Could not read request");
        }
    }
}
