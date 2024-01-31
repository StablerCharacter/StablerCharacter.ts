import * as esbuild from "esbuild";
import { spawn } from "child_process";
import { exit, stderr, stdout, argv } from "process";

const action = argv.slice(2)[0];

/// Type check & Generate type definitions files
function typescriptCompiler() {
    return new Promise((resolve, _) => {
        var process = spawn("tsc", {
            shell: true,
        });

        process.stdout.pipe(stdout);
        process.stderr.pipe(stderr);
        process.on("close", (code) => {
            resolve(code);
        });
    });
}

async function build() {
    var tscExitCode = await typescriptCompiler();
    if (tscExitCode != 0) {
        console.error(
            "It seems the TypeScript compiler exited with an error. Build failed."
        );
        exit(tscExitCode);
    }

    await esbuild.build({
        entryPoints: ["src/index.ts"],
        loader: {
            ".ts": "ts",
        },
        bundle: true,
        sourcemap: true,
        minify: true,
        format: "esm",
        outdir: "dist",
    });
}

async function watchAndServe() {
    const ctx = await esbuild.context({
        entryPoints: ["src/index.ts"],
        loader: {
            ".ts": "ts",
        },
        bundle: true,
        sourcemap: true,
        minify: true,
        format: "esm",
        outdir: "web",
    });

    await ctx.watch();

    let { host, port } = await ctx.serve({ servedir: "web" });
    console.log(`Serving the "web" folder on http://${host}:${port}`);
}

switch (action) {
    case "build":
        build();
        break;
    case "watch":
        watchAndServe();
        break;
}
