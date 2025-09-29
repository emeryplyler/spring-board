async function loadConfig()
{
    const time = new Date();
    const theme = await import("./theme.mjs");
    const hours = time.getHours();
    // from 6am to 6pm, daytime
    // from 6pm to 6am, nighttime
    if (hours >= 6 && hours < 18)
    {
        theme.setLightTheme();
    }
    else
    {
        theme.setDarkTheme();
    }
}

loadConfig();