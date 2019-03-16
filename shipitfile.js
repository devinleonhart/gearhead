module.exports = shipit => {
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      deployTo: "/home/gearhead/app/deployments",
      workspace: "/tmp/gearhead-deployment",
      repositoryUrl: "https://gitlab.com/devinleonhart/gearhead.git",
      ignores: [".git", "node_modules"],
      keepReleases: 2,
      deleteOnRollback: true,
      shallowClone: true,
    },
    production: {
      servers: [{
        host: "vikingshortboat.com",
        port: 1768,
        user: "gearhead",
      }],
    }
  });

  shipit.blTask("install dependencies", () => {
    return shipit.remote("cd /home/gearhead/app/deployments/current; rm -rf node_modules; NODE_ENV=production npm ci");
  });

  shipit.blTask("clear logs", () => {
    return shipit.remote("cd /home/gearhead/app/shared; rm -f forever-log.stdout gearhead.stderr gearhead.stdout");
  });

  shipit.blTask("restart Forever", () => {
    shipit.log("Restarting Forever");

    const sharedDir = "/home/gearhead/app/shared";
    const currentDir = "/home/gearhead/app/deployments/current";
    const foreverOptions = [
      `-l '${sharedDir}/forever-log.stdout'`,
      `-o '${sharedDir}/gearhead.stdout'`,
      `-e '${sharedDir}/gearhead.stderr'`,
      `-p '${sharedDir}'`,
      `--pidFile '${sharedDir}/pid'`,
      `--sourceDir '${currentDir}'`,
      `--workingDir '${currentDir}'`,
      '--append',
    ];

    return shipit.remote(`source /home/gearhead/.bash_profile; cd /home/gearhead/app/deployments/current; npx forever stopall || true; npx forever start ${foreverOptions.join(" ")} src/index.js`);
  });

  shipit.on("published", async () => {
    await shipit.start("install dependencies");
    await shipit.start("clear logs");
    await shipit.start("restart Forever");
  });
};
