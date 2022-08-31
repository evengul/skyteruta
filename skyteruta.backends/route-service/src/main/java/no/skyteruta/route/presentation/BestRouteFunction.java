package no.skyteruta.route.presentation;

import com.google.cloud.functions.HttpFunction;
import com.google.cloud.functions.HttpRequest;
import com.google.cloud.functions.HttpResponse;
import no.skyteruta.route.core.usecases.route.FindBestRouteUseCase;
import no.skyteruta.route.infrastructure.gateway.MatrixGatewayImpl;
import no.skyteruta.route.presentation.mappers.InputMapper;
import no.skyteruta.route.presentation.mappers.OutputMapper;

public class BestRouteFunction implements HttpFunction {
    @Override
    public void service(HttpRequest request, HttpResponse response) throws Exception {
        FindBestRouteUseCase useCase = new FindBestRouteUseCase(new MatrixGatewayImpl());
        FindBestRouteUseCase.InputValues inputValues = InputMapper.map(request);
        FindBestRouteUseCase.OutputValues outputValues = useCase.execute(inputValues);
        response.getWriter().write(OutputMapper.map(outputValues.orderedLocations()));
    }
}
