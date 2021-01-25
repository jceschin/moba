"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Notifications_1 = require("../../android/Notifications");
const core_plugins_1 = require("../core-plugins");
const ios_plugins_1 = require("../ios-plugins");
const static_plugins_1 = require("../static-plugins");
const packageName = 'expo-notifications';
exports.withNotifications = config => {
    return static_plugins_1.withStaticPlugin(config, {
        plugin: packageName,
        // If the static plugin isn't found, use the unversioned one.
        fallback: withUnversionedNotifications,
    });
};
const withNotificationsEntitlement = (config, mode) => {
    return ios_plugins_1.withEntitlementsPlist(config, config => {
        config.modResults['aps-environment'] = mode;
        return config;
    });
};
const withUnversionedNotifications = core_plugins_1.createRunOncePlugin(config => {
    // Android
    config = Notifications_1.withNotificationManifest(config);
    config = Notifications_1.withNotificationIconColor(config);
    config = Notifications_1.withNotificationIcons(config);
    // iOS
    config = withNotificationsEntitlement(config, 'development');
    return config;
}, packageName);
exports.default = exports.withNotifications;
//# sourceMappingURL=expo-notifications.js.map