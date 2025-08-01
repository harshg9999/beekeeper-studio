import { TransportLicenseKey } from "@/common/transport";
import { parseVersion, Version } from "@/common/version";
export interface BksVersion extends Version {
  channel: 'stable' | 'beta' | 'alpha'
  channelRelease?: number
}

export enum DevLicenseState {
  firstInstall,
  onTrial,
  trialExpired,
  activePaidLicense,
  expiredLifetimeCoversThisVersion,
  expiredLifetimeCoversEarlierVersion,
}


export class LicenseStatus {
  edition: "community" | "ultimate"
  condition: string[]
  license?: TransportLicenseKey
  fromFile = false
  filePath?: string = undefined

  get isUltimate() {
    return true;
  }

  get isCommunity() {
    return false;
  }

  get isTrial() {
    return false;
  }

  get isValidDateExpired() {
    return this.condition.includes("Expired valid date");
  }

  get isSupportDateExpired() {
    return this.condition.includes("Expired support date");
  }

  get maxAllowedVersion() {
    return parseVersion(this.license?.maxAllowedAppRelease?.tagName?.slice(1) ?? '0.0.0');
  }
}
