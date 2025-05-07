const USER_ID = process.env.EXPO_PUBLIC_USER_ID;
const USER_ID_ENEMY = process.env.EXPO_PUBLIC_USER_ID_ENEMY;
const API_URL = process.env.EXPO_PUBLIC_API_URL;
import { router } from 'expo-router';
// 1. Crear reto
export const crearReto = async () => {
  try {
    const response = await fetch(`${API_URL}/retos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fromUserId: USER_ID, 
        toUserId: USER_ID_ENEMY,   
        descripcion: "Reto de prueba desde botón",
      }),
    });

    const data = await response.json();
    console.log("Reto creado:", data);
    return data;
  } catch (error) {
    console.error("Error al crear reto:", error);
  }
};

// 2. Aceptar reto
export const aceptarReto = async (retoId: any) => {
  try {
    const response = await fetch(`${API_URL}/retos/${retoId}/responder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "aceptado",
        respuesta: "¡Aceptado!",
      }),
    });
    router.push({
      pathname: '/pantallaReto',
      params: { retoId },
    });
    
    const data = await response.json();
    console.log("Reto aceptado:", data);

    return data;
  } catch (error) {
    console.error("Error al aceptar reto:", error);
  }
};

// 3. Rechazar reto
export const rechazarReto = async (retoId: any) => {
  try {
    const response = await fetch(`${API_URL}/retos/${retoId}/responder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "rechazado",
        respuesta: "No puedo hacerlo",
      }),
    });

    const data = await response.json();
    console.log("Reto rechazado:", data);
    return data;
  } catch (error) {
    console.error("Error al rechazar reto:", error);
  }
};

// 4. Obtener todos los retos (extra opcional para debug)
export const obtenerRetos = async () => {
  try {
    const response = await fetch(`${API_URL}/retos`);
    const data = await response.json();
    console.log("Retos obtenidos:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener retos:", error);
  }
};

// 5. Retos pendientes para este usuario
export const verificarRetosPendientes = async () => {
  try {
    console.log("verifico si hay reto pendiente para mi");
    const response = await fetch(`${API_URL}/retos/usuario/${USER_ID}`);
    const data = await response.json();
    return data.filter((reto: { status: string }) => reto.status === "pendiente");
  } catch (error) {
    console.error("Error verificando retos:", error);
    return [];
  }
};

// 5. Retos ACPTADOS para este usuario
export const verificarRetosAceptados = async () => {
  try {
    console.log("verifico si aceptaron mi reto");
    const response = await fetch(`${API_URL}/retos/enviados/${USER_ID}`);
    const data = await response.json();
    return data.filter((reto: { status: string, ganador: string }) => reto.status === "aceptado" && (reto.ganador == null || reto.ganador == undefined) );
  } catch (error) {
    console.error("Error verificando retos aceptados:", error);
    return [];
  }
};


// 6. Responder reto acptar o rechazar
export const responderReto = async (
  retoId: string,
  status: "aceptado" | "rechazado",
  respuesta: string
) => {
  try {
    const response = await fetch(`${API_URL}/retos/${retoId}/responder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status, respuesta }),
    });

    const data = await response.json();
    console.log(`Reto ${status}:`, data);
    return data;
  } catch (error) {
    console.error(`Error al ${status} reto:`, error);
  }
};

