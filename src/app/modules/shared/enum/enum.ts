export enum UserStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  ACTIVE_B = "Active (Blocked)",
}

export enum CustomEventType {
  TOGGLE_PRIMARY_LOADER = "togglePrimaryLoader",
  ADD_CLASS_TO_BODY = "addClassToBody",
  REMOVE_CLASS_TO_BODY = "removeClassToBody",
  SHOW_TOAST_MESSAGE = "showToastMessage",
}

export enum NotificationType {
  DEFAULT = "default",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
  ERROR = "error",
}
