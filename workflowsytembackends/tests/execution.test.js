const computeExecution =
  require(
    "../services/executionService"
  )

describe(
  "Execution Planning",
  () => {

    test(
      "should return correct order",
      () => {

        const tasks = [
          {
            _id: "1",
            title: "A",
            priority: 5,
            estimatedHours: 2,
            dependencies: [],
            createdAt:
              new Date()
          },
          {
            _id: "2",
            title: "B",
            priority: 4,
            estimatedHours: 3,
            dependencies: ["1"],
            createdAt:
              new Date()
          }
        ]

        const result =
          computeExecution(
            tasks
          )

        expect(
          result[0].title
        ).toBe("A")
      }
    )
  }
)