import { TestBed } from "@angular/core/testing";

import { LocalStorageProviderService } from "./local-storage-provider.service";

describe("LocalStorageProviderService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: LocalStorageProviderService = TestBed.get(LocalStorageProviderService);
    expect(service).toBeTruthy();
  });
});
