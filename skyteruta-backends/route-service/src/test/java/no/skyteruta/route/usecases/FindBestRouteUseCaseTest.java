package no.skyteruta.route.usecases;

import com.traveltime.sdk.dto.common.Coordinates;
import com.traveltime.sdk.dto.common.Location;
import no.skyteruta.route.core.domain.LocationMatrix;
import no.skyteruta.route.core.domain.LocationMatrixElement;
import no.skyteruta.route.core.usecases.route.FindBestRouteUseCase;
import no.skyteruta.route.core.usecases.route.MatrixGateway;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.doReturn;

@ExtendWith(MockitoExtension.class)
class FindBestRouteUseCaseTest {

    @InjectMocks
    private FindBestRouteUseCase useCase;

    @Mock
    private MatrixGateway gateway;

    @Test
    void findsBestRoute() {
        // Given
        List<Location> locations = List.of(
                new Location("Hjemme", new Coordinates(63.430961, 10.445322)),
                new Location("Østre Gausdal", new Coordinates(61.279457, 10.145783)),
                new Location("Øyer/Dølen", new Coordinates(61.283218, 10.307117)),
                new Location("Ringebu og Fåvang", new Coordinates(61.472456, 10.191244)),
                new Location("Vinstra", new Coordinates(61.622818, 9.767757)),
                new Location("Otta", new Coordinates(61.763097, 9.530842))
        );
        List<String> ids = locations.stream().map(Location::getId).toList();

        LocationMatrix matrix = getMatrix(ids);

        FindBestRouteUseCase.InputValues inputValues = new FindBestRouteUseCase.InputValues(ids.get(0), locations);


        // And
        doReturn(matrix)
                .when(gateway)
                .getLocationMatrix(eq(locations), locations.get(0));

        List<String> expected = List.of(ids.get(0), ids.get(5), ids.get(4), ids.get(3), ids.get(2), ids.get(1));

        // When
        List<String> actual = useCase.execute(inputValues).orderedLocations();

        // Then
        assertEquals(actual.size(), expected.size());
        for(int i = 0; i < expected.size(); i++) {
            assertEquals(actual.get(i), expected.get(i));
        }
    }

    private LocationMatrix getMatrix(List<String> ids) {
        LocationMatrix matrix = LocationMatrix.newInstance(ids.size());

        // From home
        matrix.set(0, 0, new LocationMatrixElement(ids.get(0), ids.get(0), 0, 0));
        matrix.set(0, 1, new LocationMatrixElement(ids.get(0), ids.get(1), 276, 0));
        matrix.set(0, 2, new LocationMatrixElement(ids.get(0), ids.get(2), 268, 0));
        matrix.set(0, 3, new LocationMatrixElement(ids.get(0), ids.get(3), 247, 0));
        matrix.set(0, 4, new LocationMatrixElement(ids.get(0), ids.get(4), 239, 0));
        matrix.set(0, 5, new LocationMatrixElement(ids.get(0), ids.get(5), 208, 0));

        // From 1
        matrix.set(1, 0, new LocationMatrixElement(ids.get(1), ids.get(0), 276, 0));
        matrix.set(1, 1, new LocationMatrixElement(ids.get(1), ids.get(1), 0, 0));
        matrix.set(1, 2, new LocationMatrixElement(ids.get(1), ids.get(2), 24, 0));
        matrix.set(1, 3, new LocationMatrixElement(ids.get(1), ids.get(3), 34, 0));
        matrix.set(1, 4, new LocationMatrixElement(ids.get(1), ids.get(4), 73, 0));
        matrix.set(1, 5, new LocationMatrixElement(ids.get(1), ids.get(5), 83, 0));

        // From 2
        matrix.set(2, 0, new LocationMatrixElement(ids.get(2), ids.get(0), 268, 0));
        matrix.set(2, 1, new LocationMatrixElement(ids.get(2), ids.get(1), 24, 0));
        matrix.set(2, 2, new LocationMatrixElement(ids.get(2), ids.get(2), 0, 0));
        matrix.set(2, 3, new LocationMatrixElement(ids.get(2), ids.get(3), 25, 0));
        matrix.set(2, 4, new LocationMatrixElement(ids.get(2), ids.get(4), 64, 0));
        matrix.set(2, 5, new LocationMatrixElement(ids.get(2), ids.get(5), 75, 0));

        // From 3
        matrix.set(3, 0, new LocationMatrixElement(ids.get(3), ids.get(0), 247, 0));
        matrix.set(3, 1, new LocationMatrixElement(ids.get(3), ids.get(1), 34, 0));
        matrix.set(3, 2, new LocationMatrixElement(ids.get(3), ids.get(2), 25, 0));
        matrix.set(3, 3, new LocationMatrixElement(ids.get(3), ids.get(3), 0, 0));
        matrix.set(3, 4, new LocationMatrixElement(ids.get(3), ids.get(4), 43, 0));
        matrix.set(3, 5, new LocationMatrixElement(ids.get(3), ids.get(5), 53, 0));

        // From 4
        matrix.set(4, 0, new LocationMatrixElement(ids.get(4), ids.get(0), 239, 0));
        matrix.set(4, 1, new LocationMatrixElement(ids.get(4), ids.get(1), 73, 0));
        matrix.set(4, 2, new LocationMatrixElement(ids.get(4), ids.get(2), 64, 0));
        matrix.set(4, 3, new LocationMatrixElement(ids.get(4), ids.get(3), 43, 0));
        matrix.set(4, 4, new LocationMatrixElement(ids.get(4), ids.get(4), 0, 0));
        matrix.set(4, 5, new LocationMatrixElement(ids.get(4), ids.get(5), 44, 0));

         // From 5
        matrix.set(5, 0, new LocationMatrixElement(ids.get(5), ids.get(0), 208, 0));
        matrix.set(5, 1, new LocationMatrixElement(ids.get(5), ids.get(1), 83, 0));
        matrix.set(5, 2, new LocationMatrixElement(ids.get(5), ids.get(2), 75, 0));
        matrix.set(5, 3, new LocationMatrixElement(ids.get(5), ids.get(3), 53, 0));
        matrix.set(5, 4, new LocationMatrixElement(ids.get(5), ids.get(4), 44, 0));
        matrix.set(5, 5, new LocationMatrixElement(ids.get(5), ids.get(5), 0, 0));

        return matrix;
    }

}
