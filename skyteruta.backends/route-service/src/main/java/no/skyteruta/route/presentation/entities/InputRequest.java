package no.skyteruta.route.presentation.entities;

import java.util.List;

public record InputRequest(String startPoint, List<LocationRequest> locations) { }
