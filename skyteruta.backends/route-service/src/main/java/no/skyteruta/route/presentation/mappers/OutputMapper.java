package no.skyteruta.route.presentation.mappers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.experimental.UtilityClass;

import java.util.List;

@UtilityClass
public class OutputMapper {
    public static String map(List<String> orderedLocations) {
        try {
            return new ObjectMapper().writeValueAsString(orderedLocations);
        } catch (JsonProcessingException e) {
            return String.format("{locations: [%s]}", String.join(", ", orderedLocations));
        }
    }
}
