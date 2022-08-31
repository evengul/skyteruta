package no.skyteruta.route.core.usecases.route;

import com.traveltime.sdk.dto.common.Location;
import lombok.RequiredArgsConstructor;
import no.skyteruta.route.core.domain.LocationMatrix;
import no.skyteruta.route.core.domain.LocationMatrixElement;
import no.skyteruta.route.core.usecases.UseCase;

import java.util.*;

@RequiredArgsConstructor
public class FindBestRouteUseCase extends UseCase<FindBestRouteUseCase.InputValues, FindBestRouteUseCase.OutputValues> {

    private final MatrixGateway gateway;

    @Override
    public OutputValues execute(InputValues input) {
        final List<Location> locations = input.locations();
        final String startPoint = input.startPoint;
        LocationMatrix matrix = gateway.getLocationMatrix(locations, findStartPoint(startPoint, locations));

        return new OutputValues(findBestList(startPoint, matrix));
    }

    private Location findStartPoint(String id, List<Location> locations) {
        return locations
                .stream()
                .filter(location -> location.getId().equals(id))
                .findFirst()
                .orElseThrow();
    }

    private List<String> findBestList(String startPoint, LocationMatrix matrix) {
        List<String> orderedList = new ArrayList<>();
        orderedList.add(startPoint);

        while(orderedList.size() < matrix.size()) {
            String previousElement = orderedList.get(orderedList.size() - 1);
            LocationMatrixElement[] to = matrix.get(previousElement);
            LocationMatrixElement next = Arrays.stream(to)
                    .filter(el -> !orderedList.contains(el.to()))
                    .min(Comparator.comparingInt(LocationMatrixElement::minutes))
                    .orElseThrow();
            orderedList.add(next.to());
        }

        return orderedList;
    }

    public record InputValues(String startPoint, List<Location> locations) implements UseCase.InputValues {}

    public record OutputValues(List<String> orderedLocations) implements UseCase.OutputValues {}


}
