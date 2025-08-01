import { describe, it, beforeEach, expect } from "vitest"

const mockContract = {
  admin: "ST1ADMIN1111111111111111111111111111111",
  datasets: new Map<number, any>(),
  datasetCounter: 0,

  isAdmin(caller: string) {
    return caller === this.admin
  },

  registerDataset(caller: string, name: string, description: string, uri: string) {
    this.datasetCounter += 1
    this.datasets.set(this.datasetCounter, {
      owner: caller,
      name,
      description,
      uri,
      verified: false,
    })
    return { value: this.datasetCounter }
  },

  updateDataset(caller: string, id: number, name: string, description: string, uri: string) {
    const ds = this.datasets.get(id)
    if (!ds) return { error: 101 } // ERR-NOT-FOUND
    if (ds.owner !== caller) return { error: 102 } // ERR-NOT-OWNER

    this.datasets.set(id, { ...ds, name, description, uri })
    return { value: true }
  },

  verifyDataset(caller: string, id: number) {
    const ds = this.datasets.get(id)
    if (!this.isAdmin(caller)) return { error: 100 } // ERR-NOT-AUTHORIZED
    if (!ds) return { error: 101 } // ERR-NOT-FOUND
    if (ds.verified) return { error: 103 } // ERR-ALREADY-VERIFIED

    this.datasets.set(id, { ...ds, verified: true })
    return { value: true }
  },

  getDataset(id: number) {
    const ds = this.datasets.get(id)
    return ds ? { value: ds } : { error: 101 }
  },

  transferAdmin(caller: string, newAdmin: string) {
    if (!this.isAdmin(caller)) return { error: 100 }
    this.admin = newAdmin
    return { value: true }
  },
}

describe("Dataset Registry Contract", () => {
  beforeEach(() => {
    mockContract.admin = "ST1ADMIN1111111111111111111111111111111"
    mockContract.datasets = new Map()
    mockContract.datasetCounter = 0
  })

  it("should register a dataset", () => {
    const result = mockContract.registerDataset(
      "ST123",
      "Medical Images",
      "Labeled chest X-rays",
      "ipfs://cid"
    )
    expect(result.value).toBe(1)
  })

  it("should update dataset metadata by owner", () => {
    const id = mockContract.registerDataset("ST123", "Name", "Desc", "ipfs").value
    const result = mockContract.updateDataset("ST123", id, "New Name", "New Desc", "ipfs://new")
    expect(result).toEqual({ value: true })
  })

  it("should reject update from non-owner", () => {
    const id = mockContract.registerDataset("ST123", "Data", "Desc", "uri").value
    const result = mockContract.updateDataset("ST999", id, "X", "Y", "Z")
    expect(result).toEqual({ error: 102 })
  })

  it("should allow admin to verify dataset", () => {
    const id = mockContract.registerDataset("STX", "Name", "Desc", "uri").value
    const result = mockContract.verifyDataset("ST1ADMIN1111111111111111111111111111111", id)
    expect(result).toEqual({ value: true })
  })

  it("should reject verification by non-admin", () => {
    const id = mockContract.registerDataset("STX", "Name", "Desc", "uri").value
    const result = mockContract.verifyDataset("ST123", id)
    expect(result).toEqual({ error: 100 })
  })

  it("should transfer admin rights", () => {
    const result = mockContract.transferAdmin(
      "ST1ADMIN1111111111111111111111111111111",
      "ST2NEWADMIN999999999999999999999999999"
    )
    expect(result).toEqual({ value: true })
    expect(mockContract.admin).toBe("ST2NEWADMIN999999999999999999999999999")
  })
})
