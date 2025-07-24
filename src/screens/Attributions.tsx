import React from "preact";

export const Attributions: React.FunctionComponent = () => {
    return (
        <main>
            <h1>Attributions</h1>
            <section>
                <section>
                    <p>
                        The algorithm was taken from <a href="https://www.scheduleonegame.com/">Schedule One</a>.
                    </p>
                    <p>
                        <a href="https://github.com/Perfare/Il2CppDumper">Il2CppDumper</a> was used to dump game
                        metadata and symbols, and <a href="https://github.com/NationalSecurityAgency/ghidra">Ghidra</a>{" "}
                        was used to decompile the binary.
                    </p>
                    <p>
                        <a href="https://learn.microsoft.com/en-us/windows-hardware/drivers/debuggercmds/windbg-overview">WinDbg</a>{" "}
                        was used to inspect memory at runtime, and <a href="https://github.com/Dezzmeister/SynTypesTS">SynTypesTS</a>{" "}
                        (my own extension) was used to define types and dump memory as JSON.
                    </p>
                </section>
                <hr />
                <section>
                    <p>
                        This site was built with <a href="https://preactjs.com/">Preact</a> and
                        {" "}<a href="https://www.typescriptlang.org/">Typescript</a>.
                        The site is served by <a href="https://github.com/Dezzmeister/gru-http">gru-http</a>{" "}
                        behind <a href="https://nginx.org/">nginx</a> for TLS.
                    </p>
                </section>
            </section>
        </main>
    );
};