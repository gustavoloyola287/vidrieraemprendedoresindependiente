interface FetchOptions extends RequestInit {
    body?: any;
    }

    export const httpClient = async (endpoint: string, options: FetchOptions = {}) => {
    const token = localStorage.getItem("token");

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        ...(options.headers as Record<string, string>),
    };

    // Adjunta el token JWT si existe en localStorage
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const config: RequestInit = {
        ...options,
        headers,
    };

    if (options.body && typeof options.body !== "string" && !(options.body instanceof FormData)) {
        config.body = JSON.stringify(options.body);
    }

    const response = await fetch(endpoint, config);

    if (!response.ok) {
        if (response.status === 401) {
        // Si el token expiró, limpia el storage para forzar relogin
        localStorage.removeItem("token");
        }
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error en la petición (Código ${response.status})`);
    }

    return response.json();
};