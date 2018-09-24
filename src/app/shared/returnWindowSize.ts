import { environment } from "../../environments/environment.prod";

export default function (wSize: number): string {
    const sizes = environment.windowSizes

    if (wSize <= sizes.small) {
        return 'small'
    } else if (wSize > sizes.small || wSize <= sizes.medium) {
        return 'medium'
    } else {
        return 'large'
    }
}