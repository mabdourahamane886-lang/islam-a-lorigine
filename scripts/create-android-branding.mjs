import { mkdir, writeFile, copyFile } from "node:fs/promises";

const root = "android/app/src/main/res";
const dirs = ["drawable","mipmap","mipmap-anydpi-v26","values"];
for (const dir of dirs) await mkdir(`${root}/${dir}`, { recursive: true });

const vector = `<?xml version="1.0" encoding="utf-8"?>
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp" android:height="108dp"
    android:viewportWidth="108" android:viewportHeight="108">
    <path android:fillColor="#08734D" android:pathData="M54,7 C39,22 23,19 23,43 L23,68 L85,68 L85,43 C85,19 69,22 54,7 Z"/>
    <path android:strokeColor="#E6B83E" android:strokeWidth="2.4" android:fillColor="#00000000" android:pathData="M54,13 C40,27 29,25 29,44 L29,62 L79,62 L79,44 C79,25 68,27 54,13 Z"/>
    <path android:fillColor="#F4D77E" android:pathData="M54,17 C47,26 45,30 45,35 A9,9 0 1 0 63,35 C63,30 61,26 54,17 Z"/>
    <path android:fillColor="#F4D77E" android:pathData="M34,59 L34,43 Q34,37 40,37 Q46,37 46,43 L46,59 Z M62,59 L62,43 Q62,37 68,37 Q74,37 74,43 L74,59 Z"/>
    <path android:fillColor="#E6B83E" android:pathData="M54,61 L18,79 Q36,91 54,81 Q72,91 90,79 Z"/>
    <path android:fillColor="#FFF9E8" android:pathData="M54,65 Q36,60 23,76 L52,87 Z M54,65 Q72,60 85,76 L56,87 Z"/>
    <path android:strokeColor="#B88A27" android:strokeWidth="1.2" android:fillColor="#00000000" android:pathData="M54,65 L54,87 M28,77 Q42,73 52,82 M80,77 Q66,73 56,82"/>
</vector>`;

const adaptive = `<?xml version="1.0" encoding="utf-8"?>
<adaptive-icon xmlns:android="http://schemas.android.com/apk/res/android">
    <background android:drawable="@color/ic_launcher_background"/>
    <foreground android:drawable="@drawable/ic_launcher_foreground"/>
</adaptive-icon>`;
const splash = `<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/splash_background"/>
    <item android:gravity="center">
        <inset android:drawable="@drawable/ic_launcher_foreground" android:inset="72dp"/>
    </item>
</layer-list>`;
const values = `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <color name="ic_launcher_background">#063B2A</color>
    <color name="splash_background">#063B2A</color>
</resources>`;

await writeFile(`${root}/drawable/ic_launcher_foreground.xml`, vector);
await writeFile(`${root}/mipmap/ic_launcher.xml`, vector);
await writeFile(`${root}/mipmap/ic_launcher_round.xml`, vector);
await writeFile(`${root}/mipmap-anydpi-v26/ic_launcher.xml`, adaptive);
await writeFile(`${root}/mipmap-anydpi-v26/ic_launcher_round.xml`, adaptive);
await writeFile(`${root}/drawable/splash.xml`, splash);
await writeFile(`${root}/values/ic_launcher_colors.xml`, values);
console.log("Android adaptive launcher icons and splash drawable generated.");
