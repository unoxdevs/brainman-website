import db from "$lib/pocketbase";

export function logout() {
    db.authStore.clear();
    window.location.href = "/";
}
