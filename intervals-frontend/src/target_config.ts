// src/target_config.ts
export const target_tauri = true // <- ставь true при запуске через Tauri

export const api_proxy_addr = "http://192.168.1.169:8080"
export const img_proxy_addr = "http://192.168.1.169:9000"
export const dest_api = target_tauri ? api_proxy_addr : "/api"
export const dest_img = target_tauri ? img_proxy_addr : "/img-proxy"

// вспомогательная функция
export function fixImagePath(url?: string): string {
    if (!url) return ""
    return url.replace("127.0.0.1", "192.168.1.169")
}
