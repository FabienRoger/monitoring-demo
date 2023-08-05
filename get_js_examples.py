# %%
from datasets import load_dataset
import json

ds = load_dataset("semeru/code-text-javascript", split="validation")


def save_random_subset(n, ds):
    """Select a random subset of n examples from the dataset and save the 'code' to a json file."""
    ds = ds.shuffle(seed=42).select(range(n))["code"]
    json.dump(ds, open(f"js_examples_{n}.json", "w"), indent=2)


save_random_subset(1000, ds)
save_random_subset(100, ds)
save_random_subset(10, ds)
# %%
from matplotlib import pyplot as plt

plt.hist([len(x.split()) for x in ds["code"]], bins=100)
