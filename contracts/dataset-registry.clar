;; Dataset Registry Contract - NeuroNet Exchange
;; SPDX-License-Identifier: MIT

;; Admin initialization
(define-data-var admin principal tx-sender)

;; Unique dataset ID counter
(define-data-var dataset-counter uint u0)

;; Dataset record structure
(define-map datasets
  uint
  {
    owner: principal,
    name: (string-utf8 80),
    description: (string-utf8 256),
    uri: (string-utf8 256),
    verified: bool
  }
)

;; Error Codes
(define-constant ERR-NOT-AUTHORIZED u100)
(define-constant ERR-NOT-FOUND u101)
(define-constant ERR-NOT-OWNER u102)
(define-constant ERR-ALREADY-VERIFIED u103)

;; Private helper to check admin privileges
(define-private (is-admin)
  (is-eq tx-sender (var-get admin))
)

;; Public function: Register a new dataset
(define-public (register-dataset
    (name (string-utf8 80))
    (description (string-utf8 256))
    (uri (string-utf8 256))
  )
  (let (
        (dataset-id (+ u1 (var-get dataset-counter)))
        (entry {
          owner: tx-sender,
          name: name,
          description: description,
          uri: uri,
          verified: false
        })
      )
    (begin
      (map-set datasets dataset-id entry)
      (var-set dataset-counter dataset-id)
      (ok dataset-id)
    )
  )
)

;; Public function: Update metadata of a dataset
(define-public (update-dataset
  (dataset-id uint)
  (new-name (string-utf8 80))
  (new-description (string-utf8 256))
  (new-uri (string-utf8 256))
)
  (match (map-get? datasets dataset-id)
    some dataset
      (begin
        (asserts! (is-eq tx-sender (get owner dataset)) (err ERR-NOT-OWNER))
        (map-set datasets dataset-id {
          owner: (get owner dataset),
          name: new-name,
          description: new-description,
          uri: new-uri,
          verified: (get verified dataset)
        })
        (ok true)
      )
    none (err ERR-NOT-FOUND)
  )
)

;; Admin-only: Verify a dataset
(define-public (verify-dataset (dataset-id uint))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (match (map-get? datasets dataset-id)
      some dataset
        (begin
          (asserts! (not (get verified dataset)) (err ERR-ALREADY-VERIFIED))
          (map-set datasets dataset-id {
            owner: (get owner dataset),
            name: (get name dataset),
            description: (get description dataset),
            uri: (get uri dataset),
            verified: true
          })
          (ok true)
        )
      none (err ERR-NOT-FOUND)
    )
  )
)

;; Read-only: Fetch dataset metadata by ID
(define-read-only (get-dataset (dataset-id uint))
  (match (map-get? datasets dataset-id)
    some dataset (ok dataset)
    none (err ERR-NOT-FOUND)
  )
)

;; Admin-only: Transfer admin control to a new principal
(define-public (transfer-admin (new-admin principal))
  (begin
    (asserts! (is-admin) (err ERR-NOT-AUTHORIZED))
    (var-set admin new-admin)
    (ok true)
  )
)
