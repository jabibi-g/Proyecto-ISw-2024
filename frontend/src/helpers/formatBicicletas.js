import { startCase } from "lodash";
import { format as formatTempo } from "@formkit/tempo";
import { formatPostUpdate } from "./formatData";

export function formatBicicletasData(bicicleta) {
    return {
        ...bicicleta,
        numeroSerie: bicicleta.numeroSerie,
        marca: startCase(bicicleta.marca),
        modelo: startCase(bicicleta.modelo),
        color: startCase(bicicleta.color),
        tipo: startCase(bicicleta.tipo),
        aro: bicicleta.aro,
        venta: bicicleta.venta !== 0 ? `$${bicicleta.venta.toLocaleString('es-ES')}` : "No está a la venta",
        createdAt: formatTempo(bicicleta.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(bicicleta.updatedAt, "DD-MM-YYYY HH:mm"),
    }
}

export function formatPostBicicletas(bicicleta) {
    return {
        numeroSerie: bicicleta.numeroSerie,
        marca: startCase(bicicleta.marca),
        modelo: startCase(bicicleta.modelo),
        color: startCase(bicicleta.color),
        tipo: startCase(bicicleta.tipo),
        aro: bicicleta.aro,
        venta: bicicleta.venta !== 0 ? `$${bicicleta.venta.toLocaleString('es-ES')}` : "No está a la venta",
        createdAt: formatTempo(bicicleta.createdAt, "DD-MM-YYYY"),
        updatedAt: formatTempo(bicicleta.updatedAt, "DD-MM-YYYY HH:mm"),
    };
}
